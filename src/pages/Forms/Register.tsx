import { useEffect, useState } from 'react';
import Input from '../../components/Input';
import { InboxOutlined } from '@ant-design/icons';

import { Button, message, Modal, Spin, Upload } from 'antd';
import PaymentSumarryModal from './components/PaymentSumarryModal';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useFormik } from 'formik';
import useRegister from './hooks/useRegister';
import { useTranslation } from 'react-i18next';
import AntTextArea from '../../components/TextArea';

const { Dragger } = Upload;

export interface InitialValuesProps {
  company_name: string;
  creation_date: string;
  address: string;
  number_of_employees: string;
  website: string;
  mobile: string;
  email: string;
  company_niche: string[];
  import_morocco: string;
  export_morocco: string;
  meeting_sectors: string[];
  image_url: string;
}
interface UploadProps {
  name: string;
  multiple: boolean;
  action: string;
  beforeUpload: (file: File) => boolean | void | Promise<boolean | void>;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}
export default function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedNiche, setNiche] = useState<string[] | []>([]);
  const [selectedMeeting, setMeeting] = useState<string[] | []>([]);
  const [userId, setUserId] = useState<string>('');
  const [email, setEmail] = useState('');
  const { register, registering } = useRegister();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (phoneNumber.startsWith('+234')) {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('fr');
    }
  }, []);
  const [phoneNumber] = useState<string>(location.state.phoneNumber);
  const openSummaryModal = () => {
    setOpenSummary(true);
  };

  const closeSummary = () => {
    setOpenSummary(false);
  };

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required('Company name is required'),
    creation_date: Yup.date().required('Creation date is required'),
    address: Yup.string().required('Address is required'),
    number_of_employees: Yup.number(),
    website: Yup.string(),
    mobile: Yup.string().required('Mobile number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    company_niche: Yup.array()
      .of(Yup.string())
      .required('Company niche is required'),
    meeting_sectors: Yup.array().of(Yup.string()),
    import_morocco: Yup.string(),
    export_morocco: Yup.string(),
    image_url: Yup.string().url('Invalid image URL'),
  });
  const initialValues: InitialValuesProps = {
    company_name: '',
    creation_date: '',
    address: '',
    number_of_employees: '',
    website: '',
    mobile: phoneNumber,
    email: '',
    company_niche: [],
    import_morocco: '',
    export_morocco: '',
    meeting_sectors: [],
    image_url: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const registered = await register(values);
      if (registered.status) {
        setUserId(registered.data);
        formik.resetForm();
        message.success('Registered successfully!');
        if (phoneNumber.startsWith('+234')) {
          setEmail(values.email);

          openSummaryModal();
        } else {
          navigate('/');
        }
      }
    },
    validationSchema,
  });

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [companyNiche] = useState([
    'Importer/User',
    'Wholesaler/Distributor',
    'Intermediary',
    'Central Purchasing',
    'Manufacturer',
  ]);

  const [meetingWith] = useState([
    'Agriculture & Agro Allied',
    'Automobile',
    'Solid Minerals',
    'Energy (renewable energy)',
    'Information Technology',
  ]);
  // const [selectedAvailability, setSelectedAvailabilty] = useState([]);
  // const props: UploadProps = {
  //   name: 'file',
  //   multiple: false,
  //   action: 'https://api.cloudinary.com/v1_1/nutscoders/image/upload',
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onDrop(e) {
  //     console.log('Dropped files', e.dataTransfer.files);
  //   },
  // };
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://api.cloudinary.com/v1_1/nutscoders/image/upload',
    beforeUpload: (file) => {
      const uploadPreset = 'se5hxkgw'; // Replace with your Cloudinary upload preset name
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      // Upload the file
      fetch('https://api.cloudinary.com/v1_1/nutscoders/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the upload response
          console.log('Upload response:', data);
          if (data.error) {
            message.error(`${file.name} upload failed: ${data.error.message}`);
          } else {
            message.success(`${file.name} uploaded successfully.`);

            formik.values.image_url = data.url;
          }
        })
        .catch((error) => {
          console.error('Upload error:', error);
          message.error(`${file.name} upload failed.`);
        });
      setUploading(false);
      // Return false to prevent default upload behavior
      return false;
    },

    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div
      // style={{ backgroundImage: 'url(rectangle.png)' }}
      className="bg-cover bg-center h-[100vh] w-full relative overflow-x-hidden">
      <div
        // style={{
        //   backgroundImage: 'url(round.png)',
        //   backgroundRepeat: 'no-repeat',
        // }}
        className="fixed top-0 bottom-0 right-0 left-0 bg-bgImage  bg-contain bg-center flex flex-col items-center p-5 md:p-11 overflow-x-hidden">
        <h1 className="text-lightGreen font-bold text-4xl">{t('Register')}</h1>
        <span>{t('Part')}</span>
        <p className="text-2xl"> {t('Fill')}</p>

        <div className="flex-1 flex-col bg-transparent min-h-[200px] w-full md:w-[70%] mt-5 overflow-x-hidden">
          <span className="text-[18px] text-lightGreen">{t('Personal')}</span>
          <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
            <Input
              error={
                formik.touched.company_name && formik.errors.company_name
                  ? formik.errors.company_name
                  : ''
              }
              value={formik.values.company_name}
              onChange={formik.handleChange}
              id="company_name"
              className="w-full md:w-[70%]"
              required
              label={t('Name')}
              placeholder="Enter the name of the company"
              outlined={false}
            />

            <Input
              error={
                formik.touched.creation_date && formik.errors.creation_date
                  ? formik.errors.creation_date
                  : ''
              }
              value={formik.values.creation_date}
              id="creation_date"
              onChange={formik.handleChange}
              className="w-full md:w-[30%]"
              required
              label={t('Creation')}
              placeholder="Enter the name of the company"
              outlined={false}
              type="date"
            />
          </div>

          <AntTextArea
            error={
              formik.touched.address && formik.errors.address
                ? formik.errors.address
                : ''
            }
            value={formik.values.address}
            onChange={formik.handleChange}
            required
            id="address"
            label={t('Address')}
            outlined={false}
            placeholder="Type your address"
          />
          <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
            <Input
              error={
                formik.touched.website && formik.errors.website
                  ? formik.errors.website
                  : ''
              }
              value={formik.values.website}
              onChange={formik.handleChange}
              className="w-full md:w-[70%]"
              label={t('Website')}
              id="website"
              placeholder="www.example.com"
              outlined={false}
            />

            <Input
              id="number_of_employees"
              error={
                formik.touched.number_of_employees &&
                formik.errors.number_of_employees
                  ? formik.errors.number_of_employees
                  : ''
              }
              value={formik.values.number_of_employees}
              onChange={formik.handleChange}
              className="w-full md:w-[30%]"
              label={t('Employees')}
              outlined={false}
              type="number"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
            <Input
              required
              value={phoneNumber}
              disabled
              className="w-full md:w-[30%]"
              label={t('Mobile')}
              outlined={false}
            />

            <Input
              required
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ''
              }
              value={formik.values.email}
              id="email"
              onChange={formik.handleChange}
              className="w-full md:w-[70%]"
              label={t('Email')}
              outlined={false}
            />
          </div>
          <h1 className="my-[10px] text-[13px] font-[500]">
            {t('Is')}
            <span className="text-[red]">*</span>
          </h1>
          {companyNiche.map((options, ind) => (
            <div className="mt-3 flex items-center" key={ind.toString()}>
              <input
                className="mr-2"
                onChange={(e) => {
                  if (e.target.checked) {
                    setNiche((prev) => [...prev, options]);
                  } else {
                    const filtered = selectedNiche.filter(
                      (selected) => selected !== options
                    );
                    setNiche(filtered);
                  }
                }}
                type="checkbox"
              />
              <span className="text-[12px]">{options}</span>
            </div>
          ))}

          <AntTextArea
            error={
              formik.touched.import_morocco && formik.errors.import_morocco
                ? formik.errors.import_morocco
                : ''
            }
            value={formik.values.import_morocco}
            id="import_morocco"
            onChange={formik.handleChange}
            label={t('What')}
            outlined={false}
            placeholder="Type here"
          />

          <AntTextArea
            error={
              formik.touched.export_morocco && formik.errors.export_morocco
                ? formik.errors.export_morocco
                : ''
            }
            value={formik.values.export_morocco}
            id="export_morocco"
            onChange={formik.handleChange}
            className="mb-10"
            label={t('Export')}
            outlined={false}
            placeholder="Type here"
          />
          <span className="font-[500]">{t('Meeting')}</span>
          {meetingWith.map((options, ind) => (
            <div className="my-3 flex items-center" key={ind.toString()}>
              <input
                className="mr-2"
                onChange={(e) => {
                  if (e.target.checked) {
                    setMeeting((prev) => [...prev, options]);
                  } else {
                    const filtered = selectedMeeting.filter(
                      (selected) => selected !== options
                    );
                    setMeeting(filtered);
                  }
                }}
                type="checkbox"
              />
              <span className="text-[12px]">{options}</span>
            </div>
          ))}

          <span className="mt-5">{t('Passport')}</span>
          <div className="h-[200px] md:h-[150px] mt-4">
            <Dragger showUploadList={true} className="h-[150px]" {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>

              <p className="ant-upload-text">
                {uploading && <Spin size="large" spinning />}
                {t('Drag')}
              </p>
              <p className="ant-upload-hint">
                Please Upload or Capture your passport
              </p>
            </Dragger>
          </div>

          <div className="flex gap-4 items-center justify-end mt-10 mb-5">
            <Button className="border-lightGreen bg-transparent text-lightGreen h-[38px]">
              Reset
            </Button>
            <Button
              loading={registering}
              onClick={() => {
                formik.values.company_niche = selectedNiche;
                formik.values.meeting_sectors = selectedMeeting;

                formik.handleSubmit();
              }}
              className="bg-lightGreen h-[38px]"
              type="primary">
              {phoneNumber.startsWith('+234')
                ? 'Submit & proceed to payment'
                : t('Submit')}
            </Button>
          </div>
        </div>
      </div>

      <Modal
        closable={false}
        keyboard={false}
        footer={false}
        centered
        title=""
        open={isModalOpen}
        onOk={handleOk}>
        <div className="flex flex-col min-h-[400px] bg-white  items-cente p-3">
          <h1 className="text-[16px] text-black">Terms and Conditions</h1>
          <div className="border-[#9D9DB7] border h-[217px] w-full my-5 overflow-y-scroll p-[10px]">
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur. Nibh aliquet vel ut
              bibendum. Mauris ultrices justo fermentum malesuada ullamcorper.
              Faucibus sit nulla quam consequat odio pharetra sit scelerisque.
              Sit mauris risus gravida orci ut lacus posuere. Enim lobortis
              ultrices aliquet eget. Sem orci odio vitae lobortis viverra
              suspendisse tortor morbi dui. Adipiscing augue semper mi tristique
              iaculis et. Rhoncus porta at nec consequat. Tortor in sollicitudin
              mattis mattis sit risus. Et integer accumsan justo quam enim
              tincidunt ipsum tellus. Integer ut dolor sit fermentum porta.
              Egestas sed suscipit donec ornare tempus risus. Scelerisque
              vulputate porta magna vulputate consequat eget sit bibendum
              imperdiet. Aliquet nulla habitant magna egestas aliquam.
            </p>
          </div>
          <div className="my-3 flex items-center">
            <input className="mr-2" type="checkbox" />
            <span className="text-[12px]">I accept term and condition</span>
          </div>

          <div className="flex gap-4 items-center justify-end mt-5">
            <Button
              onClick={handleCancel}
              className="border-lightGreen bg-transparent text-lightGreen h-[38px]">
              Cancel
            </Button>
            <Button
              onClick={handleCancel}
              className="bg-lightGreen h-[38px]"
              type="primary">
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      <PaymentSumarryModal
        email={email}
        id={userId}
        isOpened={openSummary}
        handleClose={closeSummary}
      />
    </div>
  );
}
