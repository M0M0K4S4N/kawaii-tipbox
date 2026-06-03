export interface PreviewTemplate {
  id: string
  name: string
  html: string
  templateCss?: string
  baseCss: string
  overlaySelector: string
  overlayContainerClass: string
}

const tipmeHtml = `<div class="DonateGoal_style__goal" data-overlay-desc="กรอบด้านนอกสุด">
  <div class="DonateGoal_style__name" data-overlay-desc="กรอบหัวข้อ">Tip box</div>
  <div class="DonateGoal_progress__progress" data-overlay-desc="หลอดพื้นหลัง">
    <div class="DonateGoal_progress__done" data-overlay-desc="หลอดความคืบหน้า"></div>
    <div class="DonateGoal_progress__text" data-overlay-desc="ข้อความจำนวนเงินและเปอร์เซ็น">฿30 (30%)</div>
  </div>
  <div class="DonateGoal_style__legend" data-overlay-desc="กรอบข้อความด้านล่าง คลุมทั้งหมด">
    <div class="DonateGoal_style__start" data-overlay-desc="กรอบจำนวนเงินเริ่มต้น">฿0</div>
    <div class="DonateGoal_style__deadline" data-overlay-desc="กรอบระยะเวลา"><time>4 สัปดาห์</time></div>
    <div class="DonateGoal_style__end" data-overlay-desc="กรอบจำนวนเงินเป้าหมาย">฿100</div>
  </div>
</div>`

const tipmeBaseCss = `.manager_style__error {
  background-color: #a8262699;
  color: #fff;
  font-size: 16pt;
  left: 10px;
  padding: 15px;
  position: absolute;
  text-overflow: ellipsis;
  top: 10px;
  white-space: nowrap
}

.manager_style__autohide {
  animation: manager_style__hide 1ms 60s
}

@keyframes manager_style__hide {
  0% {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

.DonateGoal_progress__progress {
  background: linear-gradient(180deg, #aaa, #888);
  box-shadow: 0 0 10px #000;
  height: 42px;
  line-height: 42px;
  position: relative;
  width: 100%
}

.DonateGoal_progress__done {
  background: linear-gradient(180deg, #71e251, #509e39);
  border-right: 2px solid #444;
  height: 42px;
  left: 0;
  position: absolute;
  top: 0;
  transition: width 1s ease-out;
  width: 30%;
}

.DonateGoal_progress__text {
  position: relative
}

.DonateGoal_style__goal {
  color: #fff;
  font-size: 14pt;
  text-align: center;
  text-shadow: #000 0 0 20px
}

.DonateGoal_style__name {
  margin-bottom: 10px
}

.DonateGoal_style__legend {
  display: flex;
  flex-direction: row
}

.DonateGoal_style__deadline,
.DonateGoal_style__end,
.DonateGoal_style__start {
  flex: 1
}

.DonateGoal_style__start {
  text-align: left
}

.DonateGoal_style__end {
  text-align: right
}

.DonateGoal_style__deadline {
  text-align: center
}

/* For preview */
.DonateGoal_progress__done {
  width: 30%;
}`


const easydonateHtml = `
<svg class="absolute h-0 w-0"><defs><filter id="goal-stroke-filter" x="-20%" y="-20%" width="140%" height="140%"><feMorphology operator="dilate" radius="2.5" in="SourceAlpha" result="thickened"></feMorphology><feFlood flood-color="#000000" result="colored"></feFlood><feComposite in="colored" in2="thickened" operator="in" result="coloredOutline"></feComposite><feComposite in="SourceGraphic" in2="coloredOutline" operator="over"></feComposite></filter><filter id="desc-stroke-filter" x="-20%" y="-20%" width="140%" height="140%"><feMorphology operator="dilate" radius="2.5" in="SourceAlpha" result="thickened"></feMorphology><feFlood flood-color="#000000" result="colored"></feFlood><feComposite in="colored" in2="thickened" operator="in" result="coloredOutline"></feComposite><feComposite in="SourceGraphic" in2="coloredOutline" operator="over"></feComposite></filter></defs></svg>
<div class="flex w-full flex-col items-center justify-center text-white">
   <div class="flex w-[600px] flex-col items-center gap-2 text-center">
      <h1 style="font-family: FC Vision; font-weight: 700; color: rgb(255, 255, 255); font-size: 36px; line-height: 36px; filter: url(&quot;#goal-stroke-filter&quot;) drop-shadow(rgba(0, 0, 0, 0.6) 0px 4px 6px);">ค่าอาหารแหมว</h1>
      <div class="h-[60px] w-full rounded-full border border-white/20 bg-black/40 p-[5px]" style="filter: drop-shadow(rgba(0, 0, 0, 0.6) 0px 4px 6px);">
         <div class="relative h-full w-full overflow-hidden rounded-full" style="font-family: FC Vision;">
            <h1 class="mt-1 w-[590px] text-4xl font-bold">40฿ (40%)</h1>
            <div class="absolute top-0 left-0 h-full overflow-hidden rounded-full border border-white/20 transition-all duration-1000 ease-in-out" style="background-color: rgb(14, 165, 233); width: 40%;">
               <h1 class="mt-[3px] -ml-px w-[590px] text-4xl font-bold" style="color: rgb(255, 255, 255); filter: drop-shadow(rgba(0, 0, 0, 0.6) 0px 4px 6px);">40฿ (40%)</h1>
               <div class="goal-1-shine absolute top-1/2 left-0 h-[1200%] w-[200px] -translate-y-1/2 rotate-30" style="background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 40%, rgba(255, 255, 255, 0.6) 60%, rgba(255, 255, 255, 0) 100%);"></div>
            </div>
         </div>
      </div>
      <div class="flex w-full justify-between" style="font-family: FC Vision; font-weight: 500; color: rgb(255, 255, 255); font-size: 24px; filter: url(&quot;#desc-stroke-filter&quot;) drop-shadow(rgba(0, 0, 0, 0.6) 0px 4px 6px);">
         <p>จากเป้าหมาย 100฿</p>
         <p>สิ้นสุดใน 28 วัน</p>
      </div>
   </div>
</div>

`;

const easydonateBaseCss = ``;


export const previewTemplates: Record<string, PreviewTemplate> = {
  tipme: {
    id: 'tipme',
    name: 'TipMe Donation Box',
    html: tipmeHtml,
    baseCss: tipmeBaseCss,
    overlaySelector: '.DonateGoal_style__goal',
    overlayContainerClass: 'DonateGoal_style__goal',
  },
  easydonate: {
    id: 'easydonate',
    name: 'Easy Donate',
    html: easydonateHtml,
    baseCss: easydonateBaseCss,
    overlaySelector: '?',
    overlayContainerClass: '?',
  },
}
