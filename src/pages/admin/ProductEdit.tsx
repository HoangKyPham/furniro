import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useProductMutation from '../../hooks/useProductMutation';
import useProductQuery from '../../hooks/useProductQuery';
import { useQuery } from '@tanstack/react-query';
import { uploadFiles } from '../../services/product';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductEdit = () => {
    // handle image
    const [gallery, setGalleries] = useState<string[]>([]);
    const [image, setImage] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [maxFileError, setMaxFileError] = useState(false);
    const [value, setValue] = useState('');

    console.log(gallery)
    console.log(image)


    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useProductQuery(id);
    const { form, onSubmit } = useProductMutation({
        action: "UPDATE",
        callback: () => {
            alert("Cap nhat san pham thanh cong");
            setTimeout(() => {
                navigate('/admin')
            }, 800)
        }
    });
    const { data: categories } = useQuery({
        queryKey: ["CATEGORIES"],
        queryFn: async () => {
            const res = await axios.get(
                "http://localhost:8080/api/v1/categories",
            );
            return res.data;
        },
    });
    useEffect(() => {
        if (data) {
            setGalleries(data.gallery);
            setImage(data.image);
        }
    }, [data]);

    useEffect(() => {
        setCategory(data?.category);
    }, [data]);
    console.log(category)

    useEffect(() => {
        form.reset(data)
        setValue(data.description)
    }, [id, form, data]);


    const handleRemoveGallery = (url) => {
        setGalleries(gallery.filter(item => item !== url))
    }

    const handleRemoveAvatar = () => {
        setImage("");
    }

    const onHandleSubmit = (product: any) => {

        if (!image || !gallery.length) {
            alert("Vui lòng chọn ảnh cho sản phẩm")
            return;
        }
        console.log(product);
        onSubmit({ ...product, gallery, image });
    };

    return (
        <div>
            <div className="admin-heading">
                <h1 className="h2">Cập nhật sản phẩm</h1>
            </div>
            <form className="form" onSubmit={form.handleSubmit(onHandleSubmit)}>
                <div className="form-info">
                    <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                    <input type="text" {...form.register("name", { required: true })} className="form-input" id="name" />
                    {form.formState.errors.name && form.formState.errors.name.type === "required" && (<div className="text-danger">Không được để trống</div>)}
                </div>
                <div className="form-info">
                    <label htmlFor="category" className="form-label">Danh mục</label>
                    <select className="form-input" {...form.register("category")} id="category">
                        <option value="">Select a category</option>
                        {categories?.map((cate: any) => {
                            if (gallery === cate.id) {
                                return <option key={cate._id} defaultValue={gallery} value={gallery}>
                                    {cate.name}
                                </option>
                            } else {
                                return <option key={cate._id} value={cate._id}>
                                    {cate.name}
                                </option>
                            }
                        })}
                    </select>
                </div>

                <div className="form-count">
                    <div className="form-info">
                        <label htmlFor="price" className="form-label">Giá</label>
                        <input type="text" {...form.register("price", { validate: (value) => !isNaN(value), required: true })} className="form-input" id="price" />
                        {form.formState.errors.price && form.formState.errors.price.type === "validate" && (<div className="text-danger">Phải là số</div>)}
                        {form.formState.errors.price && form.formState.errors.price.type === "required" && (<div className="text-danger">Không được để trống</div>)}
                    </div>
                    <div className="form-info">
                        <label htmlFor="discount" className="form-label">Giảm giá</label>
                        <input type="text" {...form.register("discount")} className="form-input" id="discount" />
                    </div>
                    <div className="form-info">
                        <label htmlFor="countInStock" className="form-label">Số lượng tồn kho</label>
                        <input type="text" {...form.register("countInStock")} className="form-input" id="countInStock" />
                    </div>
                </div>
                <div className="form-img">
                    <div className="form-info">
                        <div className="gallery-wrap">
                            <div className="gallery-name_list">
                                <label htmlFor="gallery" className="gallery-action">Choose file for Gallery </label>
                                {gallery?.map((item: any, index: number) => (
                                    <span key={index} className="form-label gallery-name__item">{item.split('/').pop()?.split('.').join('.')}<button onClick={() => handleRemoveGallery(item)}>x</button></span>
                                ))}
                            </div>
                            <div className="gallery-img_list">
                                {gallery?.map((gallery: any, index: number) => (
                                    <img key={index} src={gallery} style={{ width: "20%" }} alt="image-preview" srcSet="" />
                                ))}
                            </div>
                        </div>
                        <input style={{ display: "none" }} multiple type="file" {...form.register("gallery")} className="form-input" id="gallery"
                            onChange={async (e) => {
                                if (gallery.length < 4) {
                                    const files = e.target.files;
                                    if (!files) return;
                                    const urls = await Promise.all(
                                        Array.from(files).map(
                                            uploadFiles,
                                        ),
                                    );
                                    setGalleries((prevGalleries) => [...prevGalleries, ...urls]);
                                    console.log(gallery)
                                } else {
                                    setMaxFileError(true);
                                }
                            }}
                        />

                        {maxFileError && <div className="text-danger">Chỉ được tối đa 4 ảnh</div>}
                    </div>
                    <div className="form-info">
                        <div className="gallery-wrap">
                            <div className="gallery-name_list">
                                <label htmlFor="image" className="gallery-action">Choose file for Image Preview </label>
                                {image && (
                                    <span className="form-label gallery-name__item">
                                        {image.split('/').pop()?.split('.').join('.')}<button onClick={handleRemoveAvatar}>x</button>
                                    </span>
                                )}
                            </div>
                            <div className="gallery-img_list">
                                {image && (
                                    <img src={image} style={{ width: "30%" }} alt="image-preview" srcSet="" />
                                )}
                            </div>
                        </div>
                        <input style={{ display: "none" }} type="file" {...form.register("image")} className="form-input" id="image"
                            onChange={async (e) => {
                                const files = e.target.files;
                                if (!files) return;
                                const urls = await Promise.all(
                                    Array.from(files).map(
                                        uploadFiles,
                                    ),
                                );
                                setImage(urls[0]);
                            }}
                        />
                    </div>
                </div>
                <div className="form-info__checkbox">
                    <label htmlFor="featured" className="form-label">Có phải sản phẩm nổi bật không ? :</label>
                    <input type="checkbox" {...form.register("featured")} className="form-input" id="featured" />
                </div>

                {/* <div className="form-info form-description">
                    <label htmlFor="description" className="form-label">Mô tả</label>
                    <div style={{ display: "none" }}  {...form.register("description")} className="form-input" id="description" cols="30" rows="10">{value}</div>
                    <ReactQuill value={value} onChange={setValue} theme="snow" />
                </div> */}
                <div className="form-info form-description">
                    <label htmlFor="description" className="form-label">Mô tả</label>
                    <textarea {...form.register("description", { required: true })} className="form-input" id="description" cols="30" rows="10" />
                    {form.formState.errors.description && form.formState.errors.description.type === "required" && (<div className="text-danger">Không được để trống</div>)}
                </div>
                <button type='submit' className="btn btn-primary">Cập nhật</button>
            </form >
        </div >

    )
}

export default ProductEdit