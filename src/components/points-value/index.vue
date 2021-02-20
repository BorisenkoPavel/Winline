<template>
    <div class="points-block">
        <div class="points-block__title">Накпоплено поинтов</div>
        <div class="points-block__value">
          
          <IOdometer
            class="iOdometer"
            :value="currentPoints"
            format="( ddd),dd"
            :duration="1000"
          />
          <icon 
            icon-name="coins" 
            width="15" 
            height="17.5"
          />
        </div>
        <div class="points-block__body">
          <div class="points-block__levels">
            <div class="points-block__lvl points-block__lvl--current">
              <icon
                class="level-icon"
                icon-name="rect" 
                width="16" 
                height="24"
              />
              <span>{{currentLevel+1}}</span>
            </div>
            <icon v-if="isNextLevel"
              class="points-block__arrow" 
              icon-name="arrow" 
              width="24" 
              height="16"
            />
            <div v-if="isNextLevel" class="points-block__lvl">
              <icon 
                icon-name="rect" 
                width="16" 
                height="24"
              />
              <span>{{currentLevel+2}}</span>
            </div>
          </div>
          <div class="points-block__text">{{nextStepText}}</div>
          <div v-if="pointsToNextStep" class="points-block__value points-block__value--small">
            {{pointsToNextStep}}
            <icon 
              icon-name="coins" 
              width="6" 
              height="7"
            />
          </div>
        </div>
        <div class="timer">
          <timer-block
            starttime="Feb 11, 2021 15:37:25" 
            endtime="Apr 1, 2021 16:37:25"
          />
        </div>
    </div>
</template>

<script>
import Icon from '@/common-components/icon'
import TimerBlock from '@/common-components/timer-block'
import IOdometer from 'vue-odometer';
import 'odometer/themes/odometer-theme-default.css';
import { mapGetters } from 'vuex'

export default {
  components: {
    IOdometer,
    Icon,
    TimerBlock
  },
  props: {
    levels: Array
  },
  computed: {
    ...mapGetters({getPoints: 'getPoints', currentLevel: 'getCurrentLevel'}),
    currentPoints() {
      return this.getPoints
    },
    pointsToNextStep() {
      if(this.levels[this.currentLevel+1]?.points) {
        return this.levels[this.currentLevel+1]?.points - this.getPoints
      }
      return null
    },
    isNextLevel() {
      return this.levels.length > 1 && this.levels.length !== this.currentLevel + 1
    },
    currentDate() {
      return Date.now()
    },
    nextStepText () {
      return !!this.pointsToNextStep ? 'До следующего уровня осталось' : 'У вас максимальный уровень'
    }
  }
}
</script>

<style src="./style.scss" lang="scss" scoped/>