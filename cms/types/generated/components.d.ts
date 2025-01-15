import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsTag extends Struct.ComponentSchema {
  collectionName: 'components_elements_tags_v2';
  info: {
    displayName: 'Tag';
    icon: 'attachment';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTags extends Struct.ComponentSchema {
  collectionName: 'components_elements_tags';
  info: {
    displayName: 'tags';
  };
  attributes: {
    tags: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.tag': ElementsTag;
      'elements.tags': ElementsTags;
    }
  }
}
