
import * as React from "react"
import { cn } from "../../lib"
import { ChevronRight, Folder, File } from "lucide-react" 

// Define interface for Tree item data
export interface TreeNode {
  id: string
  name: string
  type: "folder" | "file"
  children?: TreeNode[]
  disabled?: boolean
}

// Define interface for TreeView component props
export interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: TreeNode[]
  className?: string
  children?: React.ReactNode
}

// Define interface for TreeItem component props  
export interface TreeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  node?: TreeNode
  label?: string
  icon?: React.ReactNode
  expanded?: boolean
  disabled?: boolean
  children?: React.ReactNode
}

const TreeItem: React.FC<TreeItemProps> = ({ 
  node, 
  label, 
  icon, 
  expanded: initialExpanded = false,
  disabled = false,
  children,
  className,
  ...props 
}) => {
  const [isExpanded, setIsExpanded] = React.useState(initialExpanded)
  const hasChildren = !!(node?.children?.length || children)

  const toggleExpand = () => {
    if (!disabled) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div className={cn("tree-item", disabled && "opacity-50", className)} {...props}>
      <div className={cn("flex items-center space-x-1 py-0.5", disabled && "cursor-not-allowed")}>
        {hasChildren ? (
          <button 
            onClick={toggleExpand} 
            className="transition-transform duration-200"
            disabled={disabled}
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 shrink-0 text-muted-foreground",
                isExpanded && "rotate-90"
              )}
            />
          </button>
        ) : (
          <div className="w-4" />
        )}
        
        {icon || (node?.type === "folder" ? (
          <Folder className="h-4 w-4 shrink-0 text-yellow-500" />
        ) : (
          <File className="h-4 w-4 shrink-0 text-muted-foreground" />
        ))}
        
        <span>{label || node?.name}</span>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="ml-4">
          {node?.children ? (
            <TreeView data={node.children} />
          ) : (
            children
          )}
        </div>
      )}
    </div>
  )
}

const TreeView: React.FC<TreeViewProps> = ({ data, children, className, ...props }) => {
  return (
    <div className={cn("tree-view", className)} {...props}>
      {data ? (
        data.map((node) => (
          <TreeItem key={node.id} node={node} />
        ))
      ) : (
        children
      )}
    </div>
  )
}

export { TreeView, TreeItem }
