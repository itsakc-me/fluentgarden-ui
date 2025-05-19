
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ImageUp, X, File } from "lucide-react"

import { cn } from "../../lib"
import { Button } from "../button"
import { Progress } from "../progress"

const fileUploaderVariants = cva(
  "relative flex flex-col items-center justify-center w-full rounded-lg transition-all",
  {
    variants: {
      variant: {
        default: "border-2 border-dashed border-border bg-background hover:bg-accent/10",
        compact: "border border-input bg-background",
        filled: "border-2 border-dashed border-transparent bg-secondary/20 hover:bg-secondary/30",
        minimal: "border-none bg-transparent",
      },
      size: {
        default: "min-h-[200px] p-6",
        sm: "min-h-[150px] p-4",
        lg: "min-h-[300px] p-8", 
        compact: "min-h-0 p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface FileUploaderProps extends VariantProps<typeof fileUploaderVariants>, Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  onFilesSelected?: (files: File[]) => void
  onFileRemove?: (file: File) => void
  maxFiles?: number
  maxSize?: number // in bytes
  accept?: string
  showPreview?: boolean
  showFileList?: boolean
  progress?: number
  uploadedFiles?: File[]
  className?: string
}

export function FileUploader({
  variant,
  size,
  onFilesSelected,
  onFileRemove,
  maxFiles = 5,
  maxSize,
  accept,
  showPreview = true,
  showFileList = true,
  progress,
  uploadedFiles: initialFiles,
  className,
  ...props
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>(initialFiles || [])
  const [error, setError] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  
  React.useEffect(() => {
    if (initialFiles) {
      setFiles(initialFiles);
    }
  }, [initialFiles]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const validateFiles = (fileList: File[]): File[] => {
    setError(null)
    
    if (files.length + fileList.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} files.`)
      return fileList.slice(0, maxFiles - files.length)
    }
    
    if (maxSize) {
      const validSizeFiles = fileList.filter(file => {
        const isValidSize = file.size <= maxSize
        if (!isValidSize) {
          setError(`File "${file.name}" exceeds the maximum size of ${Math.round(maxSize / 1024 / 1024)}MB.`)
        }
        return isValidSize
      })
      
      if (validSizeFiles.length !== fileList.length) {
        return validSizeFiles
      }
    }
    
    return fileList
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      const validFiles = validateFiles(droppedFiles)
      
      if (validFiles.length) {
        setFiles(prevFiles => [...prevFiles, ...validFiles])
        onFilesSelected?.([...files, ...validFiles])
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      const validFiles = validateFiles(selectedFiles)
      
      if (validFiles.length) {
        setFiles(prevFiles => [...prevFiles, ...validFiles])
        onFilesSelected?.([...files, ...validFiles])
      }
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleFileRemove = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove))
    onFileRemove?.(fileToRemove)
  }

  const handleClickUpload = () => {
    fileInputRef.current?.click()
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <ImageUp className="h-6 w-6" />
    return <File className="h-6 w-6" />
  }

  const isImage = (file: File) => {
    return file.type.startsWith('image/')
  }

  const getPreviewUrl = (file: File) => {
    if (isImage(file)) {
      return URL.createObjectURL(file)
    }
    return null
  }

  return (
    <div className="space-y-3">
      <div 
        className={cn(
          fileUploaderVariants({ variant, size }),
          isDragging && "ring-2 ring-ring ring-offset-1",
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickUpload}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          multiple={maxFiles > 1}
          accept={accept}
          {...props}
        />
        
        <div className="flex flex-col items-center justify-center text-center p-4">
          <ImageUp className="mb-4 h-10 w-10 text-muted-foreground" />
          <p className="mb-2 text-sm font-medium">
            <span className="font-semibold text-primary">Click to upload</span> or drag & drop
          </p>
          <p className="text-xs text-muted-foreground">
            {accept ? `Supported formats: ${accept.split(",").join(", ")}` : "All file types supported"}
            {maxSize && ` • Max size: ${Math.round(maxSize / 1024 / 1024)}MB`}
            {maxFiles && ` • Max files: ${maxFiles}`}
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}

      {progress !== undefined && progress > 0 && (
        <div className="w-full space-y-1">
          <div className="flex justify-between text-xs">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      )}

      {showFileList && files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((file, index) => (
            <div 
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 border rounded-md bg-background"
            >
              <div className="flex items-center space-x-3">
                {showPreview && isImage(file) ? (
                  <div className="w-10 h-10 rounded-md overflow-hidden">
                    <img 
                      src={getPreviewUrl(file) || ""} 
                      alt={file.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  getFileIcon(file.type)
                )}
                <div className="space-y-1">
                  <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.type || "Unknown type"} • {Math.round(file.size / 1024)} KB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  handleFileRemove(file)
                }}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
