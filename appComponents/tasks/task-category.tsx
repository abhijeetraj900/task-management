interface TaskCategoryProps {
    category: string
  }
  
  export function TaskCategory({ category }: TaskCategoryProps) {
    return <span className="text-sm">{category}</span>
  }
  
  