import { Button } from '@/components/Button';
import React from 'react';
import { Text, View } from 'react-native';
import { useHome } from './index.hook';

export function Home() {

  const {
    handleDownload,
    isDownloading, onDownloadProgress,
    progressPercentage
  } = useHome();

  return (
    <View className="flex-1 flex pt-12 pb-12 h-full items-center justify-center bg-main-50">
      <Text className="text-2xl font-quattrocentobold mb-4 uppercase text-3xl" >App baixar PDF</Text>

      <Button
        title="Download PDF"
        onPress={handleDownload}
        isLoading={isDownloading}
      />

      {progressPercentage > 0 && (
        <Text className='uppercase font-quattrocentobold mt-8 text-xl' >
          {progressPercentage.toFixed(1)}% baixado...
        </Text>
      )}
    </View>
  );
}

