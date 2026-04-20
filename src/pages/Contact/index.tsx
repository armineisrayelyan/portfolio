import './style.css';

import { Card, Form, Input, Space, Typography, message } from 'antd';

import { Button } from '../../components/Button';
import { CONTACT_PAGE } from './consts';

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export function Contact() {
  const [api, contextHolder] = message.useMessage();

  const onFinish = async (values: ContactFormValues) => {
    void values;
    await api.success(CONTACT_PAGE.submitSuccess);
  };

  return (
    <div className="ContactPage">
      {contextHolder}

      <Space direction="vertical" size={12} className="ContactHeader">
        <Typography.Title level={3} className="ContactTitle">
          {CONTACT_PAGE.heading}
        </Typography.Title>
        <Typography.Text type="secondary">{CONTACT_PAGE.subheading}</Typography.Text>
      </Space>

      <Card className="ContactCard">
        <Form layout="vertical" onFinish={onFinish} requiredMark="optional">
          <Form.Item<ContactFormValues>
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder={CONTACT_PAGE.placeholders.name} />
          </Form.Item>

          <Form.Item<ContactFormValues>
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder={CONTACT_PAGE.placeholders.email} />
          </Form.Item>

          <Form.Item<ContactFormValues>
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Please enter a message' }]}
          >
            <Input.TextArea rows={5} placeholder={CONTACT_PAGE.placeholders.message} />
          </Form.Item>

          <Space size={12}>
            <Button type="primary" htmlType="submit">
              {CONTACT_PAGE.buttons.send}
            </Button>
            <Button htmlType="reset">{CONTACT_PAGE.buttons.reset}</Button>
          </Space>
        </Form>
      </Card>

      <Space direction="vertical" size={8} className="ContactSocial">
        <Typography.Text strong>{CONTACT_PAGE.sections.social}</Typography.Text>
        <Space size={12} wrap>
          {CONTACT_PAGE.socials.map((s) => (
            <Typography.Link key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </Typography.Link>
          ))}
        </Space>
      </Space>
    </div>
  );
}

