# product-vue
## install && run
```
  npm ci
  npm run dev    
```
## debug
1. open  http://localhost:3000
2. open web dev tool, use the mobile simulation mode

## ideas && solutions
1. The project is a mini seed of common h5 project, with eslint, husky, responsive and other basic dev tools.
2. I removed vuex and router to keep it simple for demonstration.
3. One of the difficulties is about animation or transition, so there are some tricks
   1. use transform rather than the left/top for better performation.
   2. css variable with touchmove should be the right solution, which I use it with star animation.
   3. There are still many works when each slide changed with food animtion, but I don't have enough time to finish it.
4. I wrote the food swiper component, it's simple, yet not fully tested with devices. But it's much light weight compared to 3rd lib like Swiper.js.
   
## problem
1. It seems that figma design is not well organized, for many icons could not be exported with proper size.
2. Shadow and blur effects are hardly to inspect, so I omited them mostly when coding, still need improvement.

