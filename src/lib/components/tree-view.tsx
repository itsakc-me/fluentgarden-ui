
import React, { useState, useCallback } from 'react';
import { cn } from "../utils";
import { ChevronRight, ChevronDown } from "lucide-react";

export interface TreeNode {
  id: string;
  name: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
}

interface TreeNodeProps {
  node: TreeNode;
  level: number;
  expanded: Record<string, boolean>;
  selected: string | null;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  className?: string;
}

interface TreeViewProps {
  data: TreeNode[];
  initialExpanded?: string[];
  initialSelected?: string;
  onNodeSelect?: (nodeId: string) => void;
  className?: string;
  expandOnSelect?: boolean;
  showIcons?: boolean;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  node,
  level,
  expanded,
  selected,
  onToggle,
  onSelect,
  className
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded[node.id] || false;
  const isSelected = selected === node.id;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(node.id);
  };
  
  return (
    <div className={cn("select-none", className)}>
      <div 
        className={cn(
          "flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-secondary/50 transition-colors",
          isSelected && "bg-primary/10 text-primary font-medium",
          level > 0 && `ml-${level * 4}`
        )}
        onClick={() => onSelect(node.id)}
      >
        <div className="mr-1 w-4 h-4 flex-shrink-0" onClick={hasChildren ? handleToggle : undefined}>
          {hasChildren && (
            isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
          )}
        </div>
        
        {node.icon && <span className="mr-2">{node.icon}</span>}
        <span className="truncate">{node.name}</span>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="ml-4">
          {node.children?.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              selected={selected}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({
  data,
  initialExpanded = [],
  initialSelected,
  onNodeSelect,
  className,
  expandOnSelect = true,
  showIcons = true
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    initialExpanded.reduce((acc, id) => ({ ...acc, [id]: true }), {})
  );
  const [selected, setSelected] = useState<string | null>(initialSelected || null);

  const handleToggle = useCallback((id: string) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelected(id);
    if (expandOnSelect && !expanded[id]) {
      setExpanded(prev => ({
        ...prev,
        [id]: true
      }));
    }
    if (onNodeSelect) onNodeSelect(id);
  }, [expanded, expandOnSelect, onNodeSelect]);

  return (
    <div className={cn("font-medium text-sm", className)}>
      {data.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={showIcons ? node : { ...node, icon: undefined }}
          level={0}
          expanded={expanded}
          selected={selected}
          onToggle={handleToggle}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};
