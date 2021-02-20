<template>
  <div :class="['level-list-item', {'level-list-item--active': isLevelCurrent, 'level-list-item--past-lvl': isLevelPast} ]">
    <div 
      v-show="isLevelCurrent"
      class="level-list-item__current-lvl"
    >
      Текущий уровень
    </div>
    <div class="level-list-item__container">
      <div :class="['level-list-item__rating', {'level-list-item__rating--wide': item.rating > 4}]">
        <icon 
          v-for="star in item.rating" 
          :key="star" 
          icon-name="star" 
          width="12" 
          height="12"
        />
      </div>
      <icon 
        v-if="isLevelCurrent || isLevelPast"
        class="level-list-item__baground"
        icon-name="list-item-bg"
        width="100" 
        height="150"
      />
      <icon 
        v-else
        class="level-list-item__baground"
        icon-name="list-item-bg-default"
        width="100" 
        height="150"
      />
      <div class="level-list-item__content">
        <div class="level-list-item__title">{{item.title}}</div>
        <div class="level-list-item__text-groupe">
          <div class="level-list-item__text">
            1 <icon icon-name="coins" width="6" height="7"/> = {{item.balance}} <icon class="diamond" icon-name="diamond" width="11" height="10"/>
          </div>
          <div class="level-list-item__text">
            Бонус {{bonus}} <icon class="diamond" icon-name="diamond" width="11" height="10"/>
          </div>
          <div class="level-list-item__text">Кэшбек {{item.cashback}} %</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/common-components/icon'
import { numPrettify } from '@/helpers/numPrettify'

export default {
  name: 'level-list-item',
  components: {
    Icon
  },
  props: {
    item: Object,
    isLevelCurrent: Boolean,
    isLevelPast: Boolean
  },
  computed: {
    bonus () {
      return numPrettify(this.item.bonus)
    }
  }
}
</script>

<style src="./style.scss" lang="scss" scoped/>
