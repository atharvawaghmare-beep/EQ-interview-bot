import { UploadCloud, FileText, CheckCircle2 } from "lucide-react";
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

export function ResumeUpload({ onUpload }: { onUpload: () => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setIsUploading(true);
      // Simulate processing
      setTimeout(() => {
        setIsUploading(false);
        setUploadComplete(true);
        setTimeout(onUpload, 1000); // Trigger callback after success animation
      }, 2000);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'application/pdf': ['.pdf']} });

  return (
    <div className="w-full">
       <div 
         {...getRootProps()} 
         className={`
           border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer group
           ${isDragActive ? 'border-primary bg-primary/10' : 'border-white/10 hover:border-primary/50 hover:bg-white/5'}
           ${uploadComplete ? 'border-green-500 bg-green-500/10' : ''}
         `}
       >
         <input {...getInputProps()} />
         
         <div className="flex flex-col items-center gap-4">
           <div className={`
             w-16 h-16 rounded-full flex items-center justify-center transition-colors
             ${uploadComplete ? 'bg-green-500/20 text-green-500' : 'bg-secondary text-primary'}
           `}>
             {uploadComplete ? <CheckCircle2 className="w-8 h-8" /> : <UploadCloud className="w-8 h-8" />}
           </div>
           
           <div className="space-y-1">
             <h4 className="font-medium text-lg">
               {isUploading ? "Analyzing Resume..." : uploadComplete ? "Resume Processed!" : "Upload Resume"}
             </h4>
             <p className="text-sm text-muted-foreground max-w-xs mx-auto">
               {isUploading 
                 ? "AI is extracting your skills and projects..." 
                 : uploadComplete 
                   ? "Tailoring questions to your experience..." 
                   : "Drag & drop PDF or click to browse. We'll generate questions based on your history."}
             </p>
           </div>
           
           {isUploading && (
             <div className="w-full max-w-[200px] h-1 bg-secondary rounded-full overflow-hidden mt-2">
               <motion.div 
                 className="h-full bg-primary"
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 1.5 }}
               />
             </div>
           )}
         </div>
       </div>
    </div>
  );
}
