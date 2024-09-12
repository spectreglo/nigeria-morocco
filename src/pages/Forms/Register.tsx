import { useEffect, useState } from 'react';
import Input from '../../components/Input';
import { InboxOutlined } from '@ant-design/icons';

import { Button, message, Modal, Select, Spin, Upload } from 'antd';
import PaymentSumarryModal from './components/PaymentSumarryModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useFormik } from 'formik';
import useRegister from './hooks/useRegister';
import { useTranslation } from 'react-i18next';
import AntTextArea from '../../components/TextArea';
import BackIcon from '../../components/BackIcon';

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
  governmental: boolean;
  ministry: string;
  full_name: string;
  annual_turnover: string;
  designation: string;
  cin: string;
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
  const [selectedMeeting, setMeeting] = useState<string[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [email] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const { register, registering } = useRegister();
  const navigate = useNavigate();
  const location = useLocation();
  const [isGov, setIsGov] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (phoneNumber.startsWith('+234')) {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('fr');
    }
  }, []);
  const [phoneNumber] = useState<string>(location.state.phoneNumber);
  // const openSummaryModal = () => {
  //   setOpenSummary(true);
  // };

  const closeSummary = () => {
    setOpenSummary(false);
  };

  const validationSchema = Yup.object().shape({
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
    full_name: Yup.string().required('Full name is required'),
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
    governmental: false,
    ministry: '',
    full_name: '',
    annual_turnover: '',
    designation: '',
    cin: '',
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
          navigate('/Success');
          // setEmail(values.email);

          // openSummaryModal();
        } else {
          navigate('/Success');
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

  const NigerianMinisteries = [
    {
      label: 'AHMADU BELLO UNIVERSITY',
      value: 'AHMADU BELLO UNIVERSITY',
    },
    {
      label: 'BAUCHI STATE GOVERNMENT',
      value: 'BAUCHI STATE GOVERNMENT',
    },
    {
      label: 'FEDERAL MINISTRY FOR FEDERAL CAPITAL TERRITORY (M.F.C.T.)',
      value: 'FEDERAL MINISTRY FOR FEDERAL CAPITAL TERRITORY (M.F.C.T.)',
    },
    {
      label: 'FEDERAL MINISTRY OF AGRICULTURE AND NATURAL RESOURCES',
      value: 'FEDERAL MINISTRY OF AGRICULTURE AND NATURAL RESOURCES',
    },
    {
      label: 'FEDERAL MINISTRY OF AVIATION',
      value: 'FEDERAL MINISTRY OF AVIATION',
    },
    {
      label: 'FEDERAL MINISTRY OF COMMERCE & TOURISM',
      value: 'FEDERAL MINISTRY OF COMMERCE & TOURISM',
    },
    {
      label: 'FEDERAL MINISTRY OF CULTURE TOURISM AND NATIONAL ORIENTATION',
      value: 'FEDERAL MINISTRY OF CULTURE TOURISM AND NATIONAL ORIENTATION',
    },
    {
      label: 'FEDERAL MINISTRY OF DEFENCE',
      value: 'FEDERAL MINISTRY OF DEFENCE',
    },
    {
      label: 'FEDERAL MINISTRY OF EDUCATION & YOUTH DEVELOPMENT',
      value: 'FEDERAL MINISTRY OF EDUCATION & YOUTH DEVELOPMENT',
    },
    {
      label: 'FEDERAL MINISTRY OF ENVIRONMENT',
      value: 'FEDERAL MINISTRY OF ENVIRONMENT',
    },
    {
      label: 'FEDERAL MINISTRY OF FINANCE & ECONOMIC DEVELOPMENT',
      value: 'FEDERAL MINISTRY OF FINANCE & ECONOMIC DEVELOPMENT',
    },
    {
      label: 'FEDERAL MINISTRY OF HEALTH AND SOCIAL SERVICES',
      value: 'FEDERAL MINISTRY OF HEALTH AND SOCIAL SERVICES',
    },
    {
      label: 'FEDERAL MINISTRY OF INDUSTRIES',
      value: 'FEDERAL MINISTRY OF INDUSTRIES',
    },
    {
      label: 'FEDERAL MINISTRY OF INFORMATION & COMMUNICATIONS',
      value: 'FEDERAL MINISTRY OF INFORMATION & COMMUNICATIONS',
    },
    {
      label: 'FEDERAL MINISTRY OF INTERNAL AFFAIRS',
      value: 'FEDERAL MINISTRY OF INTERNAL AFFAIRS',
    },
    {
      label: 'FEDERAL MINISTRY OF JUSTICE',
      value: 'FEDERAL MINISTRY OF JUSTICE',
    },
    {
      label: 'FEDERAL MINISTRY OF LABOUR AND PRODUCTIVITY',
      value: 'FEDERAL MINISTRY OF LABOUR AND PRODUCTIVITY',
    },
    {
      label: 'FEDERAL MINISTRY OF PETROLEUM RESOURCES',
      value: 'FEDERAL MINISTRY OF PETROLEUM RESOURCES',
    },
    {
      label: 'FEDERAL MINISTRY OF POWER',
      value: 'FEDERAL MINISTRY OF POWER',
    },
    {
      label: 'FEDERAL MINISTRY OF SCIENCE AND TECHNOLOGY',
      value: 'FEDERAL MINISTRY OF SCIENCE AND TECHNOLOGY',
    },
    {
      label: 'FEDERAL MINISTRY OF SOLID MINERALS DEVELOPMENT',
      value: 'FEDERAL MINISTRY OF SOLID MINERALS DEVELOPMENT',
    },
    {
      label: 'FEDERAL MINISTRY OF SPECIAL DUTIES',
      value: 'FEDERAL MINISTRY OF SPECIAL DUTIES',
    },
    {
      label: 'FEDERAL MINISTRY OF TRANSPORT',
      value: 'FEDERAL MINISTRY OF TRANSPORT',
    },
    {
      label: 'FEDERAL MINISTRY OF WATER RESOURCES & RURAL DEVELOPMENT',
      value: 'FEDERAL MINISTRY OF WATER RESOURCES & RURAL DEVELOPMENT',
    },
    {
      label: 'FEDERAL MINISTRY OF WOMEN AFFAIRS AND SOCIAL DEVELOPMENT',
      value: 'FEDERAL MINISTRY OF WOMEN AFFAIRS AND SOCIAL DEVELOPMENT',
    },
    {
      label: 'FEDERAL MINISTRY OF WORKS',
      value: 'FEDERAL MINISTRY OF WORKS',
    },
    {
      label: 'FEDERAL MINISTRY OF YOUTH & SPORT',
      value: 'FEDERAL MINISTRY OF YOUTH & SPORT',
    },
    {
      label: 'FEDERAL UNIVERSITY KASHERE',
      value: 'FEDERAL UNIVERSITY KASHERE',
    },
    {
      label: 'GOMBE STATE GOVERNMENT',
      value: 'GOMBE STATE GOVERNMENT',
    },
    {
      label: 'KADUNA STATE GOVERNMENT',
      value: 'KADUNA STATE GOVERNMENT',
    },
    {
      label: 'KANO STATE GOVERNMENT',
      value: 'KANO STATE GOVERNMENT',
    },
    {
      label: 'MINISTRY OF CULTURE AND COMMUNICATION',
      value: 'MINISTRY OF CULTURE AND COMMUNICATION',
    },
    {
      label: 'MINISTRY OF ECONOMY AND FINANCE',
      value: 'MINISTRY OF ECONOMY AND FINANCE',
    },
    {
      label: 'MINISTRY OF ENERGY, MINES AND ENVIROMENT',
      value: 'MINISTRY OF ENERGY, MINES AND ENVIROMENT',
    },
    {
      label: 'MINISTRY OF EQUIPMENT, TRANSPORT AND LOGISTICS',
      value: 'MINISTRY OF EQUIPMENT, TRANSPORT AND LOGISTICS',
    },
    {
      label: 'MINISTRY OF FOREIGN AFFAIRS',
      value: 'MINISTRY OF FOREIGN AFFAIRS',
    },
    {
      label:
        'MINISTRY OF FOREIGN AFFAIRS, AFRICAN COOPERATION AND MOROCCAN EXPATRIATES',
      value:
        'MINISTRY OF FOREIGN AFFAIRS, AFRICAN COOPERATION AND MOROCCAN EXPATRIATES',
    },
    {
      label: 'MINISTRY OF INTERIOR',
      value: 'MINISTRY OF INTERIOR',
    },
    {
      label:
        'MINISTRY OF NATIONAL TERITORY PLANNING, LAND PLANNING AND CITY POLICY',
      value:
        'MINISTRY OF NATIONAL TERITORY PLANNING, LAND PLANNING AND CITY POLICY',
    },
    {
      label: 'MINISTRY OF STEEL DEVELOPMENT',
      value: 'MINISTRY OF STEEL DEVELOPMENT',
    },
    {
      label: 'MINISTRY OF TOURISM, AIR TRANSPORT, CRAFT AND SOCIAL ECONOMY',
      value: 'MINISTRY OF TOURISM, AIR TRANSPORT, CRAFT AND SOCIAL ECONOMY',
    },
    {
      label: 'MINISTRY OF YOUTH, CULTURE AND COMMUNICATION',
      value: 'MINISTRY OF YOUTH, CULTURE AND COMMUNICATION',
    },
    {
      label: 'NADDC',
      value: 'NADDC',
    },
    {
      label: 'NASENI',
      value: 'NASENI',
    },
    {
      label: 'NEXIM',
      value: 'NEXIM',
    },
    {
      label: 'NIGER STATE GOVERNMENT',
      value: 'NIGER STATE GOVERNMENT',
    },
    {
      label: 'NIGERIAN INVESTMENT PROMOTION COUNCIL',
      value: 'NIGERIAN INVESTMENT PROMOTION COUNCIL',
    },
    {
      label: 'NATIONAL AGRICULTURAL DEVELOPMENT FUNDS',
      value: 'NATIONAL AGRICULTURAL DEVELOPMENT FUNDS',
    },
    {
      label: 'NITDA',
      value: 'NITDA',
    },
    {
      label: 'NSIA',
      value: 'NSIA',
    },
    {
      label: 'SMEDAN',
      value: 'SMEDAN',
    },
  ];

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
    'Solid Minerals/Steel',
    'Electricity & Renewable Energy',
    'Information Technology',
  ]);

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://api.cloudinary.com/v1_1/djlbovjlt/image/upload',
    beforeUpload: (file) => {
      const uploadPreset = 'v4lnyqau'; // Replace with your Cloudinary upload preset name
      setUploading(true); // Set uploading state to true

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      // Upload the file
      return fetch('https://api.cloudinary.com/v1_1/djlbovjlt/image/upload', {
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
        })
        .finally(() => {
          setUploading(false); // Set uploading state to false after the upload process is done
        });

      // Return false to prevent default upload behavior
      // Returning the fetch Promise allows async handling
      return false;
    },

    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  useEffect(() => {
    setIsModalOpen(true);
  }, []);
  return (
    <div
      // style={{ backgroundImage: 'url(rectangle.png)' }}
      className="bg-cover bg-center h-[100vh] w-full relative overflow-x-hidden">
      <div
        // style={{
        //   backgroundImage: 'url(round.png)',
        //   backgroundRepeat: 'no-repeat',
        // }}
        className="top-0 bottom-0 right-0 left-0 bg-bgImage  bg-contain bg-center flex flex-col items-center p-5 md:p-11 overflow-x-hidden">
        <div className="mr-auto">
          <Link to="/">
            <BackIcon />
          </Link>
        </div>

        <h1 className="text-lightGreen font-bold text-4xl">{t('Register')}</h1>
        <span>{t('Part')}</span>
        <p className="text-2xl"> {t('Fill')}</p>

        <div className="flex-1 flex-col bg-transparent min-h-[200px] w-full md:w-[50%] mt-5 overflow-x-hidden">
          <span className="text-[18px] text-lightGreen">{t('Personal')}</span>
          <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
            <div className="w-full md:w-[50%] mt-4">
              <span className="text-[12px]">{t('Organization')}</span>
              <Select
                status={
                  formik.touched.governmental && formik.errors.governmental
                    ? 'error'
                    : ''
                }
                className="w-[100%]"
                defaultValue={false}
                onChange={(e) => {
                  formik.values.governmental = e;
                  if (isGov) {
                    console.log(e);
                  }
                  setIsGov((prev) => !prev);
                }}
                options={[
                  { value: true, label: t('Governmental') },
                  { value: false, label: t('Private Company') },
                ]}
              />
            </div>
            <Input
              error={
                formik.touched.full_name && formik.errors.full_name
                  ? formik.errors.full_name
                  : ''
              }
              value={formik.values.full_name}
              onChange={formik.handleChange}
              id="full_name"
              className="w-full md:w-[50%]"
              required
              label={t('full')}
              placeholder="Enter Your Full Name"
              outlined={false}
            />
          </div>
          {formik.values.governmental ? (
            <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
              <div className="w-full md:w-[50%] mt-4">
                <span className="text-[12px]">{t('Ministry')}</span>
                <br />
                <Select
                  status={
                    formik.touched.governmental && formik.errors.governmental
                      ? 'error'
                      : ''
                  }
                  className="w-[100%] md:w-[100%]"
                  defaultValue={''}
                  onChange={(e) => {
                    formik.values.ministry = e;
                    if (isGov) {
                      console.log(e);
                    }
                    setIsGov((prev) => !prev);
                  }}
                  options={NigerianMinisteries}
                />
              </div>
              <div className="w-full md:w-[50%]">
                <Input
                  id="designation"
                  type="text"
                  value={formik.values.designation}
                  onChange={formik.handleChange}
                  className="w-full"
                  label={t('Designation')}
                  outlined={false}
                />
              </div>
            </div>
          ) : (
            <>
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
              <Input
                id="annual_turnover"
                type="number"
                value={formik.values.annual_turnover}
                onChange={formik.handleChange}
                className="w-full"
                label={t('annual')}
                outlined={false}
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
                  className="w-full md:w-[50%]"
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
                  className="w-full md:w-[50%]"
                  label={t('Employees')}
                  outlined={false}
                  type="number"
                />
              </div>
            </>
          )}
          {!phoneNumber.startsWith('+234') && (
            <Input
              id="cin"
              error={
                formik.touched.cin && formik.errors.cin ? formik.errors.cin : ''
              }
              value={formik.values.cin}
              onChange={formik.handleChange}
              className="w-full"
              label={'CIN Number'}
              outlined={false}
              type="number"
            />
          )}
          <div className="flex flex-col md:flex-row gap-0 md:gap-3 items-center">
            <Input
              required
              value={phoneNumber}
              disabled
              className="w-full md:w-[50%]"
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
              className="w-full md:w-[50%]"
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

          {meetingWith.map((option: string, ind) => (
            <div className="my-3 flex items-center" key={ind.toString()}>
              <input
                className="mr-2"
                onChange={() => {
                  setMeeting([option]); // Set the selected option as the only item in the state
                }}
                type="radio"
                name="meetingOptions"
                checked={selectedMeeting.includes(option)}
              />
              <span className="text-[12px]">{option}</span>
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
              disabled={uploading}
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
              <p>
                Welcome to Nigeria-Morocco Business Week! By proceeding with the
                registration process, you agree to the following terms and
                conditions:{' '}
              </p>
              Registration Information: <br />
              1.1 You must provide accurate and complete information during the
              registration process. <br />
              1.2 You are responsible for maintaining the confidentiality of
              your account credentials and for all activities that occur under
              your account. <br />
              <p>Data Collection and Use: </p>
              2.1 We collect personal information such as your name, email
              address, and other relevant details for registration and
              communication purposes. <br />
              2.2 Your data may be shared with third parties for specific
              purposes such as marketing, analytics, or service provision. We
              will not sell or rent your personal information to third parties
              without your explicit consent.
              <br />
              2.3 We may collect non-personal information such as browser type,
              IP address, and usage patterns to improve our services and user
              experience.
              <br />
              <p>Cookies and Tracking:</p>
              3.1 We use cookies and similar technologies to enhance your
              browsing experience and track usage patterns.
              <br />
              3.2 By using our website, you consent to the use of cookies and
              tracking technologies as described in our Privacy Policy.
              <br />
              <p>Content Submission:</p>
              4.1 You are solely responsible for any content you submit or
              upload to the website.
              <br />
              4.2 By submitting content, you grant us a non-exclusive,
              royalty-free, perpetual, irrevocable, and worldwide license to
              use, reproduce, modify, adapt, publish, translate, distribute, and
              display such content.
              <br />
              <p>Intellectual Property:</p>
              5.1 All content and materials on the website, including but not
              limited to text, graphics, logos, and software, are owned or
              licensed by us and are protected by intellectual property laws.
              <br />
              5.2 You may not use, reproduce, modify, or distribute any content
              from the website without our prior written consent.
              <br />
              <p>Disclaimer of Warranties:</p>
              6.1 We strive to provide accurate and up-to-date information, but
              we do not warrant the completeness, reliability, or accuracy of
              the content on the website.
              <br />
              6.2 Your use of the website is at your own risk, and we disclaim
              all warranties, express or implied, including but not limited to
              warranties of merchantability, fitness for a particular purpose,
              and non-infringement.
              <br />
              <p>Limitation of Liability:</p>
              7.1 We shall not be liable for any direct, indirect, incidental,
              consequential, or punitive damages arising out of your use or
              inability to use the website.
              <br />
              7.2 Our total liability to you for any claims arising from or
              related to the website shall not exceed the amount paid by you, if
              any, for accessing the website.
              <br />
              <p>Indemnification:</p>
              8.1 You agree to indemnify and hold us harmless from any claims,
              losses, liabilities, damages, costs, and expenses arising out of
              your use of the website or violation of these terms and
              conditions.
              <br />
              Governing Law: 9.1 These terms and conditions shall be governed by
              and construed in accordance with the laws of Nigeria and Morocco.
              <br />
              9.2 Any disputes arising out of or related to these terms and
              conditions shall be subject to the exclusive jurisdiction of the
              courts in Nigeria and Morocco.
              <br />
              <p>Changes to Terms:</p>
              10.1 We reserve the right to modify or update these terms and
              conditions at any time without prior notice.
              <br />
              10.2 Your continued use of the website after such changes
              constitutes your acceptance of the modified terms.
              <br />
              <p>
                Please review these terms and conditions carefully before
                proceeding with the registration process. If you do not agree
                with any part of these terms, please do not proceed further. If
                you have any questions or concerns, please contact us at
                info@spectre.com.
              </p>
              <p>
                By clicking "I Agree" or similar buttons, you acknowledge that
                you have read, understood, and agreed to these terms and
                conditions.
              </p>
            </p>
          </div>
          <div className="my-3 flex items-center">
            <input
              onChange={(e) => setIsChecked(e.currentTarget.checked)}
              checked={isChecked}
              className="mr-2"
              type="checkbox"
            />
            <span className="text-[12px]">{t('accept')}</span>
          </div>

          <div className="flex gap-4 items-center justify-end mt-5">
            <Button
              onClick={() => navigate('/')}
              className="border-lightGreen bg-transparent text-lightGreen h-[38px]">
              Cancel
            </Button>
            <Button
              disabled={!isChecked}
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
