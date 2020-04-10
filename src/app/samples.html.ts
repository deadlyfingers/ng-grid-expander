export const SAMPLES = {
  DEMO_1: `
<app-grid-expander
  [items]="items"
></app-grid-expander>
`,
  DEMO_2: `
<app-grid-expander
  [items]="itemsSubtitle"
  [template]="templateSubtitle"
  [grid]="['col-xs-4']"
  [limit]="9"
></app-grid-expander>

<ng-template #templateSubtitle let-item="item">
  <div class="title">{{ item.title }}</div>
  <p class="subtitle">{{ item.subtitle }}</p>
</ng-template>
  `,
  DEMO_3: `
<app-grid-expander
  [items]="itemsDescription"
  [template]="templateDescription"
  [grid]="['col-xs-6', 'col-sm-4']"
  [limit]="6"
></app-grid-expander>

<ng-template #templateDescription let-item="item">
  <div class="title">{{ item.title }}</div>
  <p class="subtitle">{{ item.subtitle }}</p>
  <p class="description">{{ item.description }}</p>
</ng-template>
  `,
};
