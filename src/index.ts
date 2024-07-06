import { readFileSync } from 'fs';
import * as Misskey from 'misskey-js'

export function fileToBlob(filePath: string): Blob {
  // ファイルをバイナリデータとして読み込む
  const fileBuffer = readFileSync(filePath);

  // バイナリデータをUint8Arrayに変換
  const uint8Array = new Uint8Array(fileBuffer);

  // Blobオブジェクトを作成
  const blob = new Blob([uint8Array]);

  return blob;
}

export async function blobTobinaryText(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // ファイルをバイナリデータとして読み込む
      const fileBuffer = readFileSync(filePath);

      // バッファをバイナリ文字列に変換
      const binaryString = fileBuffer.toString('binary');
      resolve(binaryString);
    } catch (error) {
      reject(error);
    }
  });
}

export async function fileToBinaryText(filePath: string): Promise<string> {
  const blob = fileToBlob(filePath);
  return blobTobinaryText(blob);
}

const filePath = '/home/taichan/heat_storoke_alert_bot/captures/today.png';
const binary = await fileToBinaryText(filePath);

const apiClient = new Misskey.api.APIClient({ origin: 'https://please.replace.your.domain', credential: '***credential***' })

// uploaded1 will be TypeError
// const uploaded1 = apiClient.request('drive/files/create', { file: fileToBlob(filePath) } as Misskey.Endpoints['drive/files/create']['req']) //TypeError
const uploaded2 = apiClient.request('drive/files/create', { file: binary } as Misskey.Endpoints['drive/files/create']['req'])

//console.log(uploaded1)
console.log(uploaded2)