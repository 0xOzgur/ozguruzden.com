import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsTag extends Struct.ComponentSchema {
  collectionName: 'components_elements_tags';
  info: {
    displayName: 'Tag';
    icon: 'attachment';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.tag': ElementsTag;
    }
  }
}
