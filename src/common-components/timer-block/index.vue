<template>
  <div class="timer-block">
      <div class="timer-block__item day">
        <span class="timer-block__count number">{{ days }}</span>
        <div class="timer-block__label format">Дн.</div>
      </div>
      <div class="timer-block__item hour">
        <span class="timer-block__count number">{{ hours }}</span>
        <div class="timer-block__label format">ч.</div>
      </div>
      <div class="timer-block__item min">
        <span class="timer-block__count number">{{ minutes }}</span>
        <div class="timer-block__label format">мин.</div>
      </div>
      <div class="timer-block__item sec">
        <span class="timer-block__count number">{{ seconds }}</span>
        <div class="timer-block__label format">сек.</div>
      </div>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>

export default {
  props: ['starttime','endtime','trans'],
  data () {
    return{
      timer:"",
      start: "",
      end: "",
      interval: "",
      days:"",
      minutes:"",
      hours:"",
      seconds:"",
      message:"",
      wordString: {},
    };
  },
  mounted () {
    this.start = new Date(this.starttime).getTime();
    this.end = new Date(this.endtime).getTime();
    this.timerCount(this.start,this.end);
    this.interval = setInterval(() => {
      this.timerCount(this.start,this.end);
    }, 1000);
  },
  methods: {
    timerCount (start, end) {
        var now = new Date().getTime();

        var distance = start - now;
        var passTime =  end - now;

        if (distance < 0 && passTime < 0) {
            clearInterval(this.interval);
            return;

        }else if (distance < 0 && passTime > 0) {
            this.calcTime(passTime);

        } else if( distance > 0 && passTime > 0 ){
            this.calcTime(distance); 
        }
    },
    calcTime (dist) {
      this.remainingTime = dist

      this.days = Math.floor(dist / (1000 * 60 * 60 * 24)).toString()

      let hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString()
      if (hours.length === 1) hours = '0' + hours
      this.hours = hours

      let minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)).toString()
      if (minutes.length === 1) minutes = '0' + minutes
      this.minutes = minutes

      let seconds = Math.floor((dist % (1000 * 60)) / 1000).toString()
      if (seconds.length === 1) seconds = '0' + seconds
      this.seconds = seconds
    }
    
  }
}
</script>

<style src="./style.scss" lang="scss" />
