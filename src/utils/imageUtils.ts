// ./utils/imageUtils.ts
export default function resizeImage(file: any, maxWidth: number, maxHeight: number, quality: number = 1) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = image;
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, width, height);
          canvas.toBlob(resolve, 'image/jpeg', quality);
        } else {
          reject('2d context is not available');
        }
      };
      image.onerror = reject;
    });
  }
  