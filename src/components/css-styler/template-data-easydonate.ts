import { Template } from './template-selector';

export const templates: Template[] = [
  {
    id: 'default',
    name: 'Default',
    featured: false,
    background: 'radial-gradient(circle, rgb(14, 165, 233), rgb(122, 209, 249))',
    css: `
/* หัวข้อ */
div.flex:nth-child(1)>h1:nth-child(1) {
  font-weight: 700 !important;
  color: rgb(255, 255, 255) !important;
  font-size: 36px !important;
  line-height: 36px !important;
  filter: url("#goal-stroke-filter") drop-shadow(rgba(0, 0, 0, 0.6) 0px 4px 6px) !important;
}

div.flex:nth-child(1)>h1:nth-child(1) {
  /* ลบขอบตัวหนังสือสีดำที่หัวข้อ */
  /* filter: drop-shadow(rgba(0, 0, 0, 0.6) 0px 4px 6px) !important; */
}

/* สีขอบหัวข้อ */
#goal-stroke-filter feFlood {
  flood-color: #000;
}

/* ข้อความคำอธิบาย */
div.flex:nth-child(3) {
  font-weight: 500 !important;
  color: rgb(255, 255, 255) !important;
  font-size: 24px !important;
  filter: url("#desc-stroke-filter") drop-shadow(rgba(0, 0, 0, 0.6) 0px 4px 6px) !important;
}

div.flex:nth-child(3) {
  /* ลบขอบตัวหนังสือสีดำที่คำอธิบาย */
  /* filter: drop-shadow(rgba(0, 0, 0, 0.6) 0px 4px 6px) !important; */
}

/* สีขอบคำอธิบาย */
#desc-stroke-filter feFlood {
  flood-color: #000;
}

/* จากเป้าหมาย */
div.flex:nth-child(3)>p:nth-child(1) {}

/* สิ้นสุดใน */
div.flex:nth-child(3)>p:nth-child(2) {}

/* พื้นหลัง */
div.flex>div.flex>div:nth-child(1) {
  border-radius: 9999px !important;
}

div.flex>div.flex>div:nth-child(2) {
  filter: drop-shadow(rgba(0, 0, 0, 0.6) 0px 4px 6px);
  background-color: color-mix(in oklab, #000 40%, transparent) !important;
}

/* เปอร์เซ็๋น */
div.flex>div.flex>div:nth-child(2)>div>h1 {
  color: #fff !important;
  font-size: 2.25rem !important;
}

/* หลอดความคืบหน้า */
div.flex>div.flex>div:nth-child(2)>div>div {
  background: rgb(14, 164, 233) !important;
  animation-duration: 300ms !important;
  border-width: 1px !important;
  border-radius: 9999px !important;
}

/* เปอร์เซ็๋น เมื่อหลอดความคืบหน้าบัง */
div.flex>div.flex>div:nth-child(2)>div>div>h1 {
  color: #fff !important;
  font-size: 2.25rem !important;
  margin-top: 0.16rem !important;
}

/* Effect หลอดความคืบหน้า */
div.flex>div.flex>div:nth-child(2)>div>div>div {
  /* ปิด */
  /* display: none; */

  /* เปิด */
  display: initial;
}
`
  }
];