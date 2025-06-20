import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';

const AccordionContext = createContext();

const Accordion = ({ children, type = "single", collapsible = false, ...props }) => {
  const [value, setValue] = useState(type === "single" ? "" : []);
  
  return (
    <AccordionContext.Provider value={{ value, setValue, type, collapsible }}>
      <div {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const AccordionItem = React.forwardRef(({ className, value, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("border-b", className)}
      {...props}
    >
      {children}
    </div>
  );
});

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { value, setValue, type, collapsible } = useContext(AccordionContext);
  const isOpen = type === "single" ? value === props.value : value.includes(props.value);
  
  const handleClick = () => {
    if (type === "single") {
      setValue(isOpen && collapsible ? "" : props.value);
    } else {
      setValue(prev => 
        isOpen 
          ? prev.filter(v => v !== props.value)
          : [...prev, props.value]
      );
    }
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </button>
  );
});

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { value, type } = useContext(AccordionContext);
  const isOpen = type === "single" ? value === props.value : value.includes(props.value);
  
  if (!isOpen) return null;
  
  return (
    <div
      ref={ref}
      className={cn("overflow-hidden text-sm transition-all", className)}
      {...props}
    >
      <div className="pb-4 pt-0">
        {children}
      </div>
    </div>
  );
});

AccordionItem.displayName = "AccordionItem";
AccordionTrigger.displayName = "AccordionTrigger";
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }; 