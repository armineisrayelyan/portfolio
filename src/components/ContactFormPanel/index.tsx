import './style.css';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, message } from 'antd';

import { CONTACT_PAGE } from './consts';

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export function ContactFormPanel() {
  const [api, contextHolder] = message.useMessage();

  async function onFinish(values: ContactFormValues) {
    void values;
    await api.success(CONTACT_PAGE.submitSuccess);
  }

  return (
    <div className="ContactFormPanel">
      {contextHolder}
      <Form layout="vertical" onFinish={onFinish} requiredMark={false} className="ContactForm">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item<ContactFormValues>
              name="name"
              label={CONTACT_PAGE.form.nameLabel}
              rules={[{ required: true, message: 'Please enter your name' }]}
              className="ContactFormItem"
            >
              <Input
                placeholder={CONTACT_PAGE.form.namePlaceholder}
                className="ContactFormInput"
                variant="borderless"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item<ContactFormValues>
              name="email"
              label={CONTACT_PAGE.form.emailLabel}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
              className="ContactFormItem"
            >
              <Input
                placeholder={CONTACT_PAGE.form.emailPlaceholder}
                className="ContactFormInput"
                variant="borderless"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<ContactFormValues>
          name="message"
          label={CONTACT_PAGE.form.messageLabel}
          rules={[{ required: true, message: 'Please enter a message' }]}
          className="ContactFormItem"
        >
          <Input.TextArea
            rows={6}
            placeholder={CONTACT_PAGE.form.messagePlaceholder}
            className="ContactFormTextarea"
            variant="borderless"
          />
        </Form.Item>

        <Form.Item className="ContactFormSubmitItem">
          <button type="submit" className="ContactFormSubmitBtn">
            {CONTACT_PAGE.form.submitLabel}
            <ArrowRightOutlined />
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
