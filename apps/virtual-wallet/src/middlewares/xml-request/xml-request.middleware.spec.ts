import { XmlRequestMiddleware } from './xml-request.middleware';

describe('XmlRequestMiddleware', () => {
  it('should be defined', () => {
    expect(new XmlRequestMiddleware()).toBeDefined();
  });
});
