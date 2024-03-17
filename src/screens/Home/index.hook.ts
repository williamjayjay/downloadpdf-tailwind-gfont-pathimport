import { useCallback, useState } from "react";
import { Alert, Platform } from "react-native";
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"

const PDF_NAME = "doc.pdf"
const PDF_URI = "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf" // leve.
// const PDF_URI = "https://www.mcfadden.com.br/assets/pdf/Flofi.pdf" // pesado

export const useHome = () => {
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  const onDownloadProgress = useCallback(({ 
    totalBytesWritten,
    totalBytesExpectedToWrite,
   }: FileSystem.DownloadProgressData) => {

    const percentage = (totalBytesWritten / totalBytesExpectedToWrite) * 100
    setProgressPercentage(percentage)
  }, []);


  const fileSave = useCallback(async (uri: string, filename: string) => {

    if (Platform.OS === "android") {
      const directoryUri = FileSystem.cacheDirectory + filename

      const base64File = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      })

      await FileSystem.writeAsStringAsync(directoryUri, base64File, {
        encoding: FileSystem.EncodingType.Base64,
      })

      await Sharing.shareAsync(directoryUri)
    } else {
      Sharing.shareAsync(uri)
    }

  }, []);


  const handleDownload =  useCallback( async () => {

    try {
      setIsDownloading(true)

      const fileUri = FileSystem.documentDirectory + PDF_NAME

      const downloadResumable = FileSystem.createDownloadResumable(
        PDF_URI,
        fileUri,
        {},
        onDownloadProgress
      )

      const downloadResponse = await downloadResumable.downloadAsync()

      if (downloadResponse?.uri) {
        await fileSave(downloadResponse.uri, PDF_NAME)
        setProgressPercentage(0)
        setIsDownloading(false)
      }
    } catch (error) {
      Alert.alert("Download", "Não foi possível realizar o download.")
      console.error(error)
    }
   
  }, []);

  return {
    progressPercentage,
    isDownloading,
    onDownloadProgress,
    handleDownload

  };
};
