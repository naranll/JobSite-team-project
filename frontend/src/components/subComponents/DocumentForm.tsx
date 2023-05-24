import { UserType } from "@/util/types"
import axios from "axios"
import { useState } from "react"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"

export default function DocumentForm({user, setDocumentVisible} : any): JSX.Element {
    const [document, setDocument] = useState<File | null>(null)
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files.length > 0) {
            setDocument(event.target.files[0])
        }
    }
    const handleDocumentUpload = () => {

        console.log("document", document)
        const formData = new FormData()

        if (document){
            formData.append("file", document)
        }

        axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/user/${user._id}`,
            headers: {
                "Content-Type": "multipart/form-data",
            }, 
            data: formData,
        }).then((res) => {
            if(res.data.success) {
                console.log("success")
            }
        }).catch((error) => {
            console.error("error uploading document: ", error.response.data)
        })

    }
    return (
        <div>
            <Dialog header="Confirmation" visible={showDialog} onHide={() => setShowDialog(false)}>
                <div className="p-3 font-semibold mb-5"> Upload and  update your CV?</div>
                <div className="flex gap-5 ">
                    <Button onClick={() => setShowDialog(false)}>Cancel</Button>
                    <Button onClick={handleDocumentUpload}>Upload</Button>
                </div>
            </Dialog>
            <form className="border-2 p-5 flex flex-col" encType="multipart/form-data" method="POST">
                <label className="font-semibold p-2" htmlFor="file">Document</label>
                <input id="file" name="file" onChange={handleFileChange} type="file" accept=".doc, .docx, .pdf, .txt" />
                <button type="button" className="rounded-lg shadow-md p-3 m-5 bg-blue-500 text-white hover:bg-blue-600" onClick={() => setShowDialog(true)}>Upload</button>
            </form>
        </div>
    )
}