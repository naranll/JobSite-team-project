import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { customAlphabet, nanoid } from 'nanoid';

@Injectable()
export class FileUploadService {
  private readonly nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 10);

  async uploadFile(fileBuffer: Buffer, filename: string): Promise<string> {
    const bucket = admin.storage().bucket();
    // const fileId = this.nanoid();
    const ext = getExtension(filename);
    const newName = nanoid() + '.' + ext;
    const filePath = `file/${newName}`; // Specify the folder path and file name

    
    

    function getExtension(name: string) {
      const arr = name.split('.');
      return arr[arr.length - 1];
    }

    const file = bucket.file(filePath);

    await file.save(fileBuffer, {
      metadata: {
        contentType: 'application/octet-stream',
        metadata: {
          firebaseStorageDownloadTokens: newName,
        },
      },
    });

    return this.getDownloadUrl(filePath);
  }

  private async getDownloadUrl(filePath: string): Promise<string> {
    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath);

    const [metadata] = await file.getMetadata();
    const downloadTokens = metadata.metadata.firebaseStorageDownloadTokens;

    return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filePath)}?alt=media&token=${downloadTokens}`;
  }
}
