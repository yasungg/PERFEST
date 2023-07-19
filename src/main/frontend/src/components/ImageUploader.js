import React, {  useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';

const ImageUpload = styled.div`

.Image-seen{
    width: 15%;
    height: 15%;
}
`;
const firebaseConfig = {
    apiKey: "AIzaSyBaDK9wBsy7cj-T1IiIiShSICh4N9S2VCw",
    authDomain: "perfest-e2b99.firebaseapp.com",
    projectId: "perfest-e2b99",
    storageBucket: "perfest-e2b99.appspot.com",
    messagingSenderId: "17333976746",
    appId: "1:17333976746:web:74e33ff543b275ad5e9ad3",
    measurementId: "G-MCWXMQSVDT"
};

initializeApp(firebaseConfig);

const storage = getStorage();

const ImageUploader = ({ onImageUpload }) => {
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const storageRef = ref(storage, "Image");
            const fileRef = ref(storageRef, file.name);

            await uploadBytes(fileRef, file);
            console.log('File uploaded successfully!');

            const downloadURL = await getDownloadURL(fileRef);
            console.log("저장경로 확인: " + downloadURL);

            setUploadedImage(downloadURL);
            onImageUpload(downloadURL);
        }
    };

    return (
        <ImageUpload>
            <input type="file" onChange={handleFileInputChange} />
            {uploadedImage && (
                <img src={uploadedImage} alt="Uploaded" className='Image-seen' />
            )}
        </ImageUpload>
    );
};

export default ImageUploader;