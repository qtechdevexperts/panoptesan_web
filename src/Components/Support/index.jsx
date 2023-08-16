import "./index.css";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { CreateSupportTicket } from "../../Services/Profile";
import { useNavigate } from 'react-router-dom';

export const SupportComponent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        description: ""
      });

    const validationSchema = yup.object({
        email: yup
          .string('Enter your email')
          .email('Enter a valid email')
          .max(100, 'Email should be maximum 100 characters')
          .required('Email is required'),
        name: yup
          .string('Enter your name')
          .min(2, 'Name should be minimum 2 characters')
          .max(100, 'Name should be maximum 100 characters')
          .required('Name is required'),
        description: yup
          .string('Enter Description')
          .min(20, 'Description should be minimum 20 characters')
          .max(1000, 'Description should be maximum 1000 characters')
          .required('Description is required'),
      });

    const formik = useFormik({
        initialValues: formData,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
          createSupportTicket(values);
        },
      });

    const createSupportTicket = (values) => {
        const payload = {
            name: formData.name,
            email: formData.email,
            message: formData.description,
          }
          CreateSupportTicket(payload).then((res) => {
            navigate("/profile-detail")
          });
    };

    return (
        <div class="body-wrapper">

            <div class="content">
                <section class="section-padding">
                    <div class="row">
                        <div class="col-lg-6" style={{paddingLeft: 0}}>
                            <h2 class="title">Help & Support</h2>
                        </div>
                        <div class="col-lg-6 text-lg-right" style={{textAlign: 'right'}}>
                            <h3><a href="#">Call Now (+1) 123456789</a></h3>
                        </div>
                    </div>
                    <div class="terms-condition">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the </p>
                    </div>
                    <div class="row">
                        <div class="col-lg-8">
                            <form class="" action="" autocomplete="off" onSubmit={formik.handleSubmit}>

                                <div class="form-row row">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label class="">Name</label>
                                            <input type="text" class="form-control" autocomplete="off" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}  required />
                                            {formik.errors.name && (
                                                <span style={{ color: 'red' }}>{formik.errors.name}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="email" class="form-control" autocomplete="off" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}  required />
                                            {formik.errors.email && (
                                                <span style={{ color: 'red' }}>{formik.errors.email}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label class="">Say Something</label>
                                            <textarea name="" id="" rows="5" class="form-control" value={formData.description} onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}  ></textarea>
                                            {formik.errors.description && (
                                                <span style={{ color: 'red' }}>{formik.errors.description}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div class="col-lg-4">

                                        <button class="btn btn-primary w-100 mt-4" type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </section>
                <script src="./assets/js/mlib.js"></script>
                <script src="./assets/js/functions.js"></script>
            </div>
        </div>
    )
}