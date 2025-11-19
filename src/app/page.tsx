"use client"
import FileDropZone from '@/components/FileDropZone'
import IconButton from '@/components/IconButton'
import { useApiDeleteCall } from '@/hooks/useApiDeleteCall'
import { useApiGetCall } from '@/hooks/useApiGetCall'
import { useApiPostCall } from '@/hooks/useApiPostCall'
import { 
  IconFileCheck, IconFileText, IconKey, IconLock, 
  IconLockOpen, IconSignature, IconTrash, IconDownload 
} from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"

const MainPage = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [serverFiles, setServerFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  const [symmetricKeyGenerated, setSymmetricKeyGenerated] = useState<boolean>(false)
  const [asymmetricKeyPairGenerated, setAsymmetricKeyPairGenerated] = useState<boolean>(false)

  const [symmetricEncripted, setSymmetricEncripted] = useState<boolean>(false)
  const [asymmetricEncripted, setAsymmetricEncripted] = useState<boolean>(false)

  const [fileSigned, setFileSigned] = useState<boolean>(false)

  const { apiCall, message: messageGet } = useApiGetCall()
  const { apiCallPost, message: messagePost } = useApiPostCall()
  const { apiDeleteCall } = useApiDeleteCall()

  useEffect(() => {
    if (messageGet) toast(messageGet)
  }, [messageGet])

  useEffect(() => {
    if (messagePost) toast(messagePost)
  }, [messagePost])

  const loadServerFiles = async () => {
    const res = await fetch("/api/data")
    const data = await res.json()
    setServerFiles(data.files || [])
    console.log("Loaded server files:", data.files)
  }

  useEffect(() => {
    loadServerFiles()
  }, [])

  const handleFileDrop = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setUploadedFile(file)
        toast.success(`Uploaded: ${file.name}`)
        loadServerFiles()
      } else {
        toast.error(result.error)
      }
    } finally {
      setUploading(false)
    }
  }

  const handleClearFile = async () => {
    setUploadedFile(null)
    setAsymmetricKeyPairGenerated(false)
    setSymmetricKeyGenerated(false)

    await apiDeleteCall('/api/remove-all')
  }

  const handleGenerateSymmetricKey = async () => {
    await apiCall('/api/keys/generate/symmetric')
    loadServerFiles()
    setSymmetricKeyGenerated(true)
  }

  const handleGenerateKeyPair = async () => {
    await apiCall('/api/keys/generate/asymmetric')
    loadServerFiles()
    setAsymmetricKeyPairGenerated(true)
  }

  const handleEncryptSymmetric = async () => {
    await apiCallPost('/api/encrypt/symmetric', { filename: uploadedFile.name })
    setSymmetricEncripted(true)
    loadServerFiles()
  }

  const handleDecryptSymmetric = async () => {
    await apiCallPost('/api/decrypt/symmetric', { filename: uploadedFile.name })
    setSymmetricEncripted(false)
    loadServerFiles()
  }

  const handleEncryptAsymmetric = async () => {
    await apiCallPost('/api/encrypt/asymmetric', { filename: uploadedFile.name })
    setAsymmetricEncripted(true)
    loadServerFiles()
  }

  const handleDecryptAsymmetric = async () => {
    await apiCallPost('/api/decrypt/asymmetric', { filename: uploadedFile.name })
    setAsymmetricEncripted(false)
    loadServerFiles()
  }

  const handleCalculateHash = async () => {
    await apiCallPost('/api/hash', { filename: uploadedFile.name })
    loadServerFiles()
  }

  const handleSignFile = async () => {
    await apiCallPost('/api/sign', { filename: uploadedFile.name })
    setFileSigned(true)
    loadServerFiles()
  }

  const handleVerifySignature = async () => {
    await apiCallPost('/api/verify', { filename: uploadedFile.name })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 background text-white">

      {!uploadedFile ? (
        <div className="w-full max-w-2xl">
          <FileDropZone onFileDrop={handleFileDrop} />
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col gap-6">

          <div className="rounded-lg flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <IconFileText size={32} className="text-[#dec9e9]" />
              <div>
                <p className="font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-gray-400">{(uploadedFile.size/1024).toFixed(2)} KB</p>
              </div>
            </div>
            <div className="flex gap-4">
              <a 
                href={URL.createObjectURL(uploadedFile)} 
                download={uploadedFile.name}
                className="text-blue-300 hover:text-blue-100"
              >
                <IconDownload size={24}/>
              </a>
              <IconTrash onClick={handleClearFile} size={24} className="cursor-pointer text-red-500 hover:text-red-400" />
            </div>
          </div>

          <div className="rounded-lg p-6">
            <h2 className="text-2xl font-medium mb-4! flex items-center gap-2">
              <IconLock size={28} className="text-[#dec9e9]" />
              Symmetric cryptography
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <IconButton icon={<IconKey size={20} />} 
              disabled={symmetricKeyGenerated}
              text="Generate key" onClick={handleGenerateSymmetricKey} />
              <IconButton icon={<IconLock size={20} />}
              disabled={!symmetricKeyGenerated}
              text="Encrypt" onClick={handleEncryptSymmetric} />
              <IconButton icon={<IconLockOpen size={20} />}
              disabled={!symmetricKeyGenerated || !symmetricEncripted}
              text="Decrypt" onClick={handleDecryptSymmetric} />
            </div>
          </div>

          <div className="rounded-lg p-6">
            <h2 className="text-2xl font-medium mb-4! flex items-center gap-2">
              <IconKey size={28} className="text-[#dec9e9]"/>
              Asymmetric cryptography
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <IconButton icon={<IconKey size={20} />} 
              disabled={asymmetricKeyPairGenerated}
              text="Generate RSA key pair" onClick={handleGenerateKeyPair} />
              <IconButton icon={<IconLock size={20} />} 
              disabled={!asymmetricKeyPairGenerated}
              text="Encrypt" onClick={handleEncryptAsymmetric} />
              <IconButton icon={<IconLockOpen size={20} />} 
              disabled={!asymmetricKeyPairGenerated || !asymmetricEncripted}
              text="Decrypt" onClick={handleDecryptAsymmetric} />
              <IconButton icon={<IconSignature size={20} />} text="Sign file" onClick={handleSignFile} 
              disabled={!asymmetricKeyPairGenerated}/>
              <IconButton icon={<IconFileCheck size={20} />} text="Verify signature" onClick={handleVerifySignature}
              disabled={!fileSigned || !asymmetricKeyPairGenerated} />
            </div>
          </div>

          <div className="rounded-lg p-6">
            <h2 className="text-2xl font-medium mb-4! flex items-center gap-2">
              <IconFileText size={28} className="text-[#dec9e9]" />
              Hash
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <IconButton icon={<IconFileText size={20} />} text="Calculate Hash" onClick={handleCalculateHash} />
            </div>
          </div>

          <div className="rounded-lg p-6">
            <h2 className="text-xl font-medium mb-3!">Generated files</h2>
            <div className="grid grid-cols-4 gap-2 truncate">
              {serverFiles.map((file) => (
                <a 
                  key={file.name} 
                  href={`api/static/${file.name}`}
                  download={`${file.name}`}
                  className="flex items-center justify-between bg-white/10 p-3! rounded hover:bg-white/20 transition duration-200 ease-in-out gap-2"
                >
                  <span className='truncate font-mono! font-light text-xs'>{file.name}</span>
                  <IconDownload size={20}/>
                </a>
              ))}
            </div>
          </div>

          {uploading && (
            <div className="text-gray-300">Uploading...</div>
          )}
        </div>
      )}
    </div>
  )
}

export default MainPage
