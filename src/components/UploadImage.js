import React, {useState} from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import Axios from 'axios';

const UploadImage = ({imageUrl, setImageUrl}) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');
    const uploadingUrl = "https://api.cloudinary.com/v1_1/vadim-kirtsun/image/upload";

    const uploadImage = (info) => {
        if(image === undefined || image === ""){
            setImage(info.file);
        }else if (image.name === info.file.name){
            return
        }else{
            setImage(info.file);
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("file", info.file.originFileObj);
        formData.append("upload_preset", "wqsbiawq");

        Axios.post(uploadingUrl, formData)
            .then((response) => {
            setLoading(false);
            setImageUrl(response.data.url);
        });
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
            <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={uploadImage}
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                        'maxHeight': '100px',
                        'maxWidth': '100px',
                    }}
                />
            ) : (
                uploadButton
            )}
        </Upload>
    );
};

export default UploadImage;

