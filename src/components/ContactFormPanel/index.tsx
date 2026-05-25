import './style.css';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, message } from 'antd';
import { useState } from 'react';

import { CONTACT_PAGE } from './consts';

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

type TelegramResponse = {
  ok?: boolean;
  error?: string;
};

export function ContactFormPanel() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<ContactFormValues>();
  const [loading, setLoading] = useState(false);

  async function onFinish(values: ContactFormValues) {
    setLoading(true);
    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = (await res.json()) as TelegramResponse;

      if (!res.ok) {
        await messageApi.error(data.error ?? CONTACT_PAGE.submitError);
        return;
      }

      await messageApi.success(CONTACT_PAGE.submitSuccess);
      form.resetFields();
    } catch {
      await messageApi.error(CONTACT_PAGE.submitError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ContactFormPanel">
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        className="ContactForm"
        onSubmitCapture={(e) => e.preventDefault()}
      >
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
          <button type="submit" className="ContactFormSubmitBtn" disabled={loading}>
            {loading ? CONTACT_PAGE.form.sendingLabel : CONTACT_PAGE.form.submitLabel}
            <ArrowRightOutlined />
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
