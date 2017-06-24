const path = require('path');
const fs = require('fs');
const axios = require('axios');

const imageData = require(path.join(__dirname, '/imagedata.json'));

const baseUrl = 'https://census.daybreakgames.com';

const failedImages = [];
const failedImagesDet = [];
const erroredImages = [];

// axios.get('https://census.daybreakgames.com/files/ps2/images/static/85053.png', {
//   responseType: 'arraybuffer'
// })
//   .then((res) => {
//     if (res && res.status == 200 && res.data) {
//       const imgPath = `./imagesdownloads/${85053}.png`;
//       const imageBuffer = new Buffer(res.data, 'binary');
//       fs.writeFileSync(imgPath, imageBuffer);
//       console.log(`image with ${85053} downloaded`)
//       return;
//     }
//   })
//   .catch((err) => {
//     console.log(`image with ${85053} failed`)
//     // failedImages.push()
//     const url = `https://census.daybreakgames.com/s:leigh103/get/ps2:v2/image_set?c:limit=1&image_id=${85053}`
//     axios.get(url)
//       .then((response) => {
//         if (!res || !res.data || !res.data.image_set_list || res.data.image_set_list.length == 0) {
//           // erroredImages.push()
//           console.log(`image with ${85053} errored`)

//           throw new Error('imagePath not found');
//         }
//         failedImagesDet.push(res.data.image_set_list[0])
//       })
//       .catch((err) => {
//         console.error(error)
//       });
//     return
//   });

// let newPromise = Promise.resolve();

// for (let i = 0; i < imageData.length; i++) {

//   const imageInfo = imageData[i];
//   const url = `${baseUrl}${imageInfo.path}`;
//   const imageId = imageInfo.image_id;

//   if (i == 0) {
//     newPromise = newPromise.then(() => {
//       return axios.get(url, {
//         responseType: 'arraybuffer'
//       });
//     });
//   } else {
//     newPromise = newPromise.then((res) => {
//       if (res && (res.status == 200 || (res.status > 200 && res.status < 300))) {
//         const imgPath = `./imagesdownloads/${imageId}.png`;
//         const imageBuffer = new Buffer(res.data, 'binary');
//         fs.writeFileSync(imgPath, imageBuffer);
//         console.log(`image with ${imageId} downloaded`)
//         return axios.get(url, {
//           responseType: 'arraybuffer'
//         });
//       }
//     })
//       .catch((err) => {
//         console.log(`image with ${imageId} failed`)

//         // failedImages.push(imageInfo);
//         // fs.writeFileSync('./failedImages.json',JSON.stringify(failedImages));

//         const url = `https://census.daybreakgames.com/s:leigh103/get/ps2:v2/image_set?c:limit=1&image_id=${85053}`
//         axios.get(url)
//           .then((response) => {
//             if (!res || !res.data || !res.data.image_set_list || res.data.image_set_list.length == 0) {

//               erroredImages.push(imageInfo)
//               fs.writeFileSync('./erroredImages.json',JSON.stringify(erroredImages));

//               console.log(`image with ${imageId} errored`)

//               throw new Error('imagePath not found');
//             }

//             failedImagesDet.push(res.data.image_set_list[0])
//             fs.writeFileSync('./failedImagesDet.json',JSON.stringify(failedImagesDet));
//           })
//           .catch((err) => {
//             console.error(err)
//           });

//         return axios.get(url, {
//           responseType: 'arraybuffer'
//         });

//       });
//   }
// }

// newPromise = newPromise.catch((err) => {
//   console.error(err);
// });
// 
// 
// 

const failedImageData = require('./failedImages.json');
let newPromise = Promise.resolve();

const length = failedImageData.length;

for (let i = 0; i < length; i++) {

  const imageInfo = failedImageData[i];
  const url = `${baseUrl}${imageInfo.path}`;
  const imageId = imageInfo.image_id;

  if (i == 0) {
    newPromise = newPromise.then(() => {
      return axios.get(`https://census.daybreakgames.com/s:leigh103/get/ps2:v2/image_set?c:limit=1&image_id=${imageId}`);
    });
  } else {
    newPromise = newPromise.then((res) => {
      if (!res || !res.data || !res.data.image_set_list || res.data.image_set_list.length == 0) {

        erroredImages.push(imageInfo)
        fs.writeFileSync('./erroredImages.json', JSON.stringify(erroredImages));

        console.log(`image with ${imageId},${i},${length} errored`)

        throw new Error('imagePath not found');
      }

      console.log(`image ${imageId},${i},${length} Found`)
      failedImagesDet.push(res.data.image_set_list[0])
      fs.writeFileSync('./failedImagesDet.json', JSON.stringify(failedImagesDet));
      
      return axios.get(`https://census.daybreakgames.com/s:leigh103/get/ps2:v2/image_set?c:limit=1&image_id=${imageId}`)

    }).catch((err) => {
      // console.error(err)
      return axios.get(`https://census.daybreakgames.com/s:leigh103/get/ps2:v2/image_set?c:limit=1&image_id=${imageId}`)
    });
  }
}

newPromise = newPromise.catch((err) => {
  console.error(err);
});