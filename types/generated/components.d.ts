import type { Schema, Attribute } from '@strapi/strapi';

export interface ScheduleHorario extends Schema.Component {
  collectionName: 'components_schedule_horarios';
  info: {
    displayName: 'Horario';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    dayOfWeek: Attribute.String & Attribute.Required;
    opening: Attribute.Time;
    closing: Attribute.Time;
    closed: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'schedule.horario': ScheduleHorario;
    }
  }
}
