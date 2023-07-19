import React, {  useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';

const ImageUpload = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const InputWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  width: 300px;
  height: 180px;
`;

const InputText = styled.span`
  font-size: 16px;
  color: #333;
`;

const ImagePreview = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 8px;
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
            <InputText>이미지 선택</InputText>
            <InputWrapper>
                <input type="file" onChange={handleFileInputChange} style={{ display: "none" }} />
                {uploadedImage && <ImagePreview src={uploadedImage} alt="Uploaded" />}
            </InputWrapper>
        </ImageUpload>
    );
};

export default ImageUploader;