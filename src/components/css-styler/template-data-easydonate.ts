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
  },
  {
    id: 'night-sky',
    name: 'Night Sky',
    featured: false,
    background: 'radial-gradient(circle, #0b0c2a 0%, #1a1a3e 50%, #000 100%)',
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
  background: linear-gradient(135deg, #0b0c2a 0%, #1a1a3e 50%, #000 100%) !important;
  animation-duration: 300ms !important;
  border-width: 1px !important;
  border-radius: 9999px !important;
  overflow: hidden !important;
}

div.flex>div.flex>div:nth-child(2)>div>div::before {
  content: '' !important;
  position: relative !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  pointer-events: none !important;
  box-shadow: 
    10px 15px 0 0.5px rgba(255,255,255,0.8),
    25px 40px 0 1px rgba(255,255,255,0.7),
    50px 20px 0 0.5px rgba(255,255,255,0.9),
    70px 55px 0 0.75px rgba(255,255,255,0.6),
    90px 10px 0 1px rgba(255,255,255,0.8),
    110px 35px 0 0.25px rgba(255,255,255,0.5),
    130px 60px 0 0.5px rgba(255,255,255,0.7),
    160px 25px 0 0.75px rgba(255,255,255,0.9),
    180px 45px 0 1px rgba(255,255,255,0.6),
    200px 70px 0 0.5px rgba(255,255,255,0.8),
    220px 15px 0 1px rgba(255,255,255,0.7),
    250px 50px 0 0.25px rgba(255,255,255,0.5),
    270px 30px 0 0.75px rgba(255,255,255,0.9),
    300px 65px 0 0.5px rgba(255,255,255,0.7),
    320px 10px 0 1px rgba(255,255,255,0.8),
    350px 40px 0 0.5px rgba(255,255,255,0.6),
    380px 55px 0 0.75px rgba(255,255,255,0.9),
    400px 20px 0 0.25px rgba(255,255,255,0.5),
    420px 45px 0 1px rgba(255,255,255,0.7),
    450px 70px 0 0.5px rgba(255,255,255,0.8),
    480px 35px 0 0.75px rgba(255,255,255,0.6),
    500px 60px 0 0.5px rgba(255,255,255,0.9),
    15px 5px 0 0.5px rgba(255,255,255,0.7),
    40px 80px 0 1px rgba(255,255,255,0.6),
    65px 12px 0 0.25px rgba(255,255,255,0.8),
    95px 90px 0 0.75px rgba(255,255,255,0.5),
    120px 8px 0 0.5px rgba(255,255,255,0.9),
    145px 72px 0 1px rgba(255,255,255,0.7),
    170px 18px 0 0.25px rgba(255,255,255,0.6),
    195px 48px 0 0.75px rgba(255,255,255,0.8),
    215px 85px 0 0.5px rgba(255,255,255,0.5),
    240px 22px 0 1px rgba(255,255,255,0.9),
    265px 68px 0 0.25px rgba(255,255,255,0.7),
    290px 14px 0 0.75px rgba(255,255,255,0.6),
    310px 78px 0 0.5px rgba(255,255,255,0.8),
    340px 28px 0 0.5px rgba(255,255,255,0.9),
    360px 62px 0 1px rgba(255,255,255,0.7),
    390px 8px 0 0.25px rgba(255,255,255,0.5),
    410px 52px 0 0.75px rgba(255,255,255,0.8),
    440px 82px 0 0.5px rgba(255,255,255,0.6),
    470px 16px 0 1px rgba(255,255,255,0.9),
    495px 74px 0 0.25px rgba(255,255,255,0.7),
    5px 42px 0 0.75px rgba(255,255,255,0.5),
    30px 88px 0 0.5px rgba(255,255,255,0.8),
    55px 3px 0 1px rgba(255,255,255,0.6),
    80px 66px 0 0.25px rgba(255,255,255,0.9),
    105px 10px 0 0.75px rgba(255,255,255,0.7),
    135px 36px 0 0.5px rgba(255,255,255,0.5),
    155px 92px 0 1px rgba(255,255,255,0.8),
    185px 24px 0 0.25px rgba(255,255,255,0.6),
    210px 58px 0 0.75px rgba(255,255,255,0.9),
    235px 12px 0 0.5px rgba(255,255,255,0.7),
    260px 44px 0 1px rgba(255,255,255,0.5),
    285px 76px 0 0.25px rgba(255,255,255,0.8),
    305px 30px 0 0.75px rgba(255,255,255,0.6),
    330px 68px 0 0.5px rgba(255,255,255,0.9),
    355px 6px 0 1px rgba(255,255,255,0.7),
    375px 50px 0 0.25px rgba(255,255,255,0.5),
    395px 84px 0 0.75px rgba(255,255,255,0.8),
    415px 18px 0 0.5px rgba(255,255,255,0.6),
    435px 62px 0 1px rgba(255,255,255,0.9),
    455px 2px 0 0.25px rgba(255,255,255,0.7),
    475px 46px 0 0.75px rgba(255,255,255,0.5),
    490px 90px 0 0.5px rgba(255,255,255,0.8),
    12px 34px 0 1px rgba(255,255,255,0.6),
    38px 96px 0 0.25px rgba(255,255,255,0.9),
    60px 4px 0 0.75px rgba(255,255,255,0.7),
    82px 38px 0 0.5px rgba(255,255,255,0.5),
    108px 86px 0 1px rgba(255,255,255,0.8),
    128px 14px 0 0.25px rgba(255,255,255,0.6),
    148px 56px 0 0.75px rgba(255,255,255,0.9),
    168px 98px 0 0.5px rgba(255,255,255,0.7),
    188px 26px 0 1px rgba(255,255,255,0.5),
    208px 80px 0 0.25px rgba(255,255,255,0.8),
    228px 8px 0 0.75px rgba(255,255,255,0.6),
    248px 54px 0 0.5px rgba(255,255,255,0.9),
    268px 32px 0 1px rgba(255,255,255,0.7),
    288px 70px 0 0.25px rgba(255,255,255,0.5),
    308px 10px 0 0.75px rgba(255,255,255,0.8),
    328px 44px 0 0.5px rgba(255,255,255,0.6),
    348px 82px 0 1px rgba(255,255,255,0.9),
    368px 20px 0 0.25px rgba(255,255,255,0.7),
    388px 64px 0 0.75px rgba(255,255,255,0.5),
    408px 8px 0 0.5px rgba(255,255,255,0.8),
    428px 48px 0 1px rgba(255,255,255,0.6),
    448px 86px 0 0.25px rgba(255,255,255,0.9),
    468px 16px 0 0.75px rgba(255,255,255,0.7),
    488px 72px 0 0.5px rgba(255,255,255,0.5);
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
  },
  {
    id: 'pink-neon',
    name: 'Pink Neon',
    featured: false,
    background: 'radial-gradient(circle, #ff9a9e, #fad0c4)',
    css: `
/* หัวข้อ */
div.flex:nth-child(1)>h1:nth-child(1) {
  font-weight: 700 !important;
  color: rgb(255, 255, 255) !important;
  font-size: 36px !important;
  line-height: 36px !important;
  filter: drop-shadow(0 0 15px rgba(255, 182, 193, 0.9)) drop-shadow(0 0 30px rgba(230, 230, 250, 0.6)) !important;
  text-shadow: 0 0 10px #ffb6c1, 0 0 20px #e6e6fa;
}

div.flex:nth-child(1)>h1:nth-child(1) {
  /* ลบขอบตัวหนังสือสีดำที่หัวข้อ */
  /* filter: drop-shadow(rgba(0, 0, 0, 0.6) 0px 4px 6px) !important; */
}

/* สีขอบหัวข้อ */
#goal-stroke-filter feFlood {
  flood-color: #ffb6c1;
}

/* ข้อความคำอธิบาย */
div.flex:nth-child(3) {
  font-weight: 500 !important;
  color: rgb(255, 255, 255) !important;
  font-size: 24px !important;
  filter: drop-shadow(0 0 15px rgba(255, 182, 193, 0.8)) drop-shadow(0 0 25px rgba(200, 180, 255, 0.5)) !important;
  text-shadow: 0 0 10px #fbc2eb, 0 0 20px #a6c1ee;
}

div.flex:nth-child(3) {
  /* ลบขอบตัวหนังสือสีดำที่คำอธิบาย */
  /* filter: drop-shadow(rgba(0, 0, 0, 0.6) 0px 4px 6px) !important; */
}

/* สีขอบคำอธิบาย */
#desc-stroke-filter feFlood {
  flood-color: #a6c1ee;
}

/* จากเป้าหมาย */
div.flex:nth-child(3)>p:nth-child(1) {}

/* สิ้นสุดใน */
div.flex:nth-child(3)>p:nth-child(2) {}

div.flex>div.flex>div:nth-child(1) {
  border-radius: 9999px !important;
}

div.flex>div.flex>div:nth-child(2) {
  filter: drop-shadow(0 0 20px rgba(255, 182, 193, 0.6)) drop-shadow(0 0 40px rgba(230, 230, 250, 0.4)) !important;

  background: linear-gradient(135deg, #ffe4e1, #e6e6fa) !important;
  border: 2px solid rgba(255, 255, 255, 0.8) !important;
  position: relative;
}

/* เปอร์เซ็นต์ */
div.flex>div.flex>div:nth-child(2)>div>h1 {
  color: #fff !important;
  font-size: 2.25rem !important;
  text-shadow: 0 0 10px rgba(255, 182, 193, 0.8);
}

/* หลอดความคืบหน้า */
div.flex>div.flex>div:nth-child(2)>div>div {
  background: linear-gradient(90deg, #fbc2eb, #a6c1ee) !important;
  animation-duration: 300ms !important;
  border-width: 1px !important;
  border-color: rgba(255, 255, 255, 0.6) !important;
  border-radius: 9999px !important;
  box-shadow: 0 0 25px rgba(255, 182, 193, 0.7), inset 0 0 15px rgba(255, 255, 255, 0.5) !important;
}

/* เปอร์เซ็นต์ */
div.flex>div.flex>div:nth-child(2)>div>div>h1 {
  color: #fff !important;
  font-size: 2.25rem !important;
  margin-top: 0.16rem !important;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 182, 193, 0.6);
}

/* Effect หลอดความคืบหน้า */
div.flex>div.flex>div:nth-child(2)>div>div>div {
  /* ปิด */
  /* display: none; */

  /* เปิด */
  display: block !important;
  position: absolute !important;
  top: 0 !important;
  left: -100% !important;
  width: 100% !important;
  height: 100% !important;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent) !important;
  animation: shine 2.5s ease-in-out infinite !important;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 200%; }
}

div.flex>div.flex>div:nth-child(2)::before {
  content: '✿';
  position: absolute;
  left: -25px;
  top: -15px;
  font-size: 28px;
  color: #ffb6c1;
  filter: drop-shadow(0 0 15px #ffb6c1);
  animation: floating 3s ease-in-out infinite;
  z-index: 10;
}

div.flex>div.flex>div:nth-child(2)::after {
  content: '✿';
  position: absolute;
  right: -25px;
  bottom: -15px;
  font-size: 28px;
  color: #a6c1ee;
  filter: drop-shadow(0 0 15px #a6c1ee);
  animation: floating 3s ease-in-out infinite reverse;
  z-index: 10;
}

@keyframes floating {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(15deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

div.flex>div.flex>div:nth-child(2) > div {
  position: relative;
}
`
  }
];