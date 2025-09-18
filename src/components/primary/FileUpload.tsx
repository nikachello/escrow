"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUploadProps } from "@/lib/types/fileUpload";
import { CheckCircle, ImageUp, Loader2, X } from "lucide-react";
import { useState } from "react";

const FileUpload = ({ context, dealId, userId }: FileUploadProps) => {
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");
  const [imageId, setImageId] = useState("");
  const [uploading, setUploading] = useState(false);

  const deleteImage = async () => {
    try {
      if (!file) {
        alert("ფაილი არ არის არჩეული");
        return;
      }

      setUrl("");
      const data = new FormData();
      data.set("imageId", imageId);
      if (dealId) data.set("dealId", dealId);
      if (userId) data.set("userId", userId);
      data.set("context", context);
      const deleteReqiest = await fetch("/api/files", {
        method: "DELETE",
        body: data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("ფაილი არ არის არჩეული");
        return;
      }

      setUploading(true);
      const data = new FormData();
      if (dealId) data.set("dealId", dealId);
      if (userId) data.set("userId", userId);
      data.set("context", context);
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const fileData = await uploadRequest.json();
      setUrl(fileData.url);
      setImageId(fileData.id);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("შეცდომა ფაილის ატვირთვისას");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  return (
    <div>
      <p className="font-heading font-bold">
        ატვირთეთ გაგზავნის/ჩაბარების დოკუმენტი
      </p>
      <div className="w-full m-auto flex flex-row justify-center items-center gap-5">
        {/* File input */}
        <Input type="file" onChange={handleChange} disabled={uploading} />

        {/* Upload button */}
        <Button
          disabled={!file || uploading || url.length > 0}
          onClick={uploadFile}
          className="flex items-center justify-center w-12 h-12 rounded-full"
          variant="outline"
        >
          {uploading ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : url ? (
            <CheckCircle className="text-green-500 w-5 h-5" />
          ) : (
            <ImageUp className="w-5 h-5" />
          )}
        </Button>

        {/* Image preview */}
        {url && (
          <div className="relative w-16 h-16 rounded-md overflow-hidden border shadow-sm">
            <img
              src={url}
              alt="Uploaded preview"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => deleteImage()} // clear the image URL state
              className="absolute top-0 right-0 bg-black/60 hover:bg-black/80 text-white rounded-full p-0.5 m-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
