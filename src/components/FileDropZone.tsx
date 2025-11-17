import { IconFileDownload } from "@tabler/icons-react";
import React from "react";

interface FileDropZoneProps {
    onFileDrop: (file: File) => void;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFileDrop }) => {
    const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            onFileDrop(event.dataTransfer.files[0]);
            console.log(event.dataTransfer.files[0]);
            event.dataTransfer.clearData();
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
    };

    const handleClick = (): void => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.onchange = (e: Event): void => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                onFileDrop(target.files[0]);
                console.log(target.files[0]);
            }
        };
        fileInput.click();
    };

    return (
        <div
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-400 rounded-lg p-6! gap-2 text-center cursor-pointer flex flex-col items-center justify-center hover:border-gray-300 transition-colors"
        >
            <IconFileDownload className="mx-auto text-gray-300" size={48} />
            <p className="text-gray-200">Drag and drop a file here, or click to select a file</p>
        </div>
    );
};

export default FileDropZone;