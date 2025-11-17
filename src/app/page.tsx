"use client"
import FileDropZone from '@/components/FileDropZone'
import IconButton from '@/components/IconButton'
import { useApiGetCall } from '@/hooks/useApiGetCall'
import { useApiPostCall } from '@/hooks/useApiPostCall'
import { IconFileCheck, IconFileText, IconKey, IconLock, IconLockOpen, IconSignature, IconTrash } from '@tabler/icons-react'
import React, { useState } from 'react'

const MainPage = () => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);

    const handleFileDrop = async (file: File) => {
        setUploading(true);
        setMessage('Uploading file...');

        try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            setUploadedFile(file);
            setMessage(`File uploaded successfully: ${file.name}`);
        } else {
            setMessage(`Upload failed: ${result.error}`);
        }
        } catch (error) {
        console.error('Upload error:', error);
        setMessage('Failed to upload file');
        } finally {
        setUploading(false);
        }
    };

    const handleClearFile = () => {
        setUploadedFile(null);
        setMessage('');
    };

    const { apiCall, loading: loadingGet, message: messageGet } = useApiGetCall();
    const { apiCallPost, loading, message: messagePost } = useApiPostCall();

    const handleGenerateSymmetricKey = () => {
        apiCall('/api/keys/generate/symmetric');
    };

    const handleGenerateKeyPair = () => {
        apiCall('/api/keys/generate/asymmetric');
    };

    const handleEncryptSymmetric = () => {
        apiCallPost('/api/encrypt/symmetric', { filename: uploadedFile.name });
    };

    const handleDecryptSymmetric = () => {
        apiCallPost('/api/decrypt/symmetric', { filename: uploadedFile?.name });
    };

    const handleEncryptAsymmetric = () => {
        apiCallPost('/api/encrypt/asymmetric', { filename: uploadedFile.name });
    };

    const handleDecryptAsymmetric = () => {
        apiCallPost('/api/decrypt/asymmetric', { filename: uploadedFile.name });
    };

    const handleCalculateHash = () => {
        apiCallPost('/api/hash', { filename: uploadedFile.name });
    };

    const handleSignFile = () => {
        apiCallPost('/api/sign', { filename: uploadedFile.name });
    };

    const handleVerifySignature = () => {
        apiCallPost('/api/verify', { filename: uploadedFile.name });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 background text-white">

        {!uploadedFile ? (
            <>
            <h1 className="text-4xl font-bold mb-4">Welcome to Cryptography Playground</h1>
            <div className="w-full max-w-2xl">
            <FileDropZone onFileDrop={handleFileDrop} />
            </div>
            </>
        ) : (
            <div className="w-full max-w-4xl flex flex-col gap-6">
            <div className="rounded-lg p-4 flex items-center gap-6">
                <div className="flex items-center gap-3">
                <IconFileText size={32} className="text-[#dec9e9]" />
                <div>
                    <p className="font-semibold">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-400">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                </div>
                </div>
                <IconTrash onClick={handleClearFile} size={24} className="cursor-pointer text-red-500 hover:text-red-400 transition-colors" />
            </div>

            <div className=" rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4! flex items-center gap-2">
                <IconKey size={28} className="text-[#dec9e9]"/>
                Generate Keys
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <IconButton
                    icon={<IconKey size={20} />}
                    text="Generate Symmetric Key"
                    onClick={handleGenerateSymmetricKey}
                    disabled={loading}
                />
                <IconButton
                    icon={<IconKey size={20} />}
                    text="Generate Key Pair (RSA)"
                    onClick={handleGenerateKeyPair}
                    disabled={loading}
                />
                </div>
            </div>

            <div className="rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4! flex items-center gap-2">
                <IconLock size={28} className="text-[#dec9e9]"/>
                Encrypt / Decrypt
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <IconButton
                    icon={<IconLock size={20} />}
                    text="Encrypt (Symmetric)"
                    onClick={handleEncryptSymmetric}
                    disabled={loading}
                />
                <IconButton
                    icon={<IconLockOpen size={20} />}
                    text="Decrypt (Symmetric)"
                    onClick={handleDecryptSymmetric}
                    disabled={loading}
                />
                <IconButton
                    icon={<IconLock size={20} />}
                    text="Encrypt (Asymmetric)"
                    onClick={handleEncryptAsymmetric}
                    disabled={loading}
                />
                <IconButton
                    icon={<IconLockOpen size={20} />}
                    text="Decrypt (Asymmetric)"
                    onClick={handleDecryptAsymmetric}
                    disabled={loading}
                />
                </div>
            </div>

            <div className="rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4! flex items-center gap-2">
                <IconSignature size={28} className="text-[#dec9e9]"/>
                Hash & Digital Signature
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <IconButton
                    icon={<IconFileText size={20} />}
                    text="Calculate Hash"
                    onClick={handleCalculateHash}
                    disabled={loading}
                />
                <IconButton
                    icon={<IconSignature size={20} />}
                    text="Sign File"
                    onClick={handleSignFile}
                    disabled={loading}
                />
                <IconButton
                    icon={<IconFileCheck size={20} />}
                    text="Verify Signature"
                    onClick={handleVerifySignature}
                    disabled={loading}
                />
                </div>
            </div>

            {(message || messageGet || messagePost) && (
                <div className="rounded-lg p-4">
                <p className="text-blue-100">{message}</p>
                </div>
            )}

            {(loading || uploading || loadingGet) && (
                <div className="flex items-center justify-center gap-2 text-gray-400">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
                </div>
            )}
            </div>
        )}
        </div>
    );
};

export default MainPage;