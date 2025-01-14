import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsTag extends Struct.ComponentSchema {
  collectionName: 'components_elements_tags';
  info: {
    description: 'Tag component for projects';
    displayName: 'Tag';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.tag': ElementsTag;
    }
  }
}
