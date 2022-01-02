const model = {
    currentCar: null,
    cars: [
        {
            clickCount: 0,
            name: 'Coupe Maserati',
            imgSrc: 'img/black-convertible-coupe.jpg'
        },
        {
            clickCount: 0,
            name: 'Camaro SS 1LE',
            imgSrc: 'img/chevrolet-camaro.jpg'
        },
        {
            clickCount: 0,
            name: 'Dodger Charger 1970',
            imgSrc: 'img/dodge-charger.jpg'
        },
        {
            clickCount: 0,
            name: 'Ford Mustang 1966',
            imgSrc: 'img/ford-mustang.jpg'
        },
        {
            clickCount: 0,
            name: '190 SL Roadster 1962',
            imgSrc: 'img/mercedes-benz.jpg'
        },
    ],
};

const controller = {
    init() {
      model.currentCar=model.cars[0];

      carListView.init();
      carView.init();
    },
    getCurrentCar(){
      return model.currentCar;
    },
    getCars() {
        return model.cars;
    },
    setCurrentCar(car){
        model.currentCar = car;
    },
    incrementCounter() {
        model.currentCar.clickCount++;
        carView.render();
    },
};

const carView = {
    init() {
        this.carElem = document.getElementById('car');
        this.carNameElem =  document.getElementById('car-name');
        this.carImageElem = document.getElementById('car-img');
        this.countElem = document.getElementById('car-count');

        this.carImageElem.addEventListener('click',this.clickHandler);
        this.render();
    },

    clickHandler() {
        return controller.incrementCounter();
    },

    render() {
      const currentCar = controller.getCurrentCar();
      this.countElem.textContent = currentCar.clickCount;
      this.carNameElem.textContent = currentCar.name;
      this.carImageElem.src =  currentCar.imgSrc;
    },
};

const carListView = {
  init() {
      this.carListElem = document.getElementById('car-list');
      this.render();
  },

   render() {
     const cars = controller.getCars();
     this.carListElem.innerHTML = '';

     for(let i=0;i<cars.length;i++){
         car=cars[i];
         elem = document.createElement('li');
         elem.className = 'list-group-item d-flex justify-content-between lh-condensed';
         elem.style.cursor= 'pointer';
         elem.textContent = car.name;
         elem.addEventListener(
             'click',(function (car){
                 return function (){
                     controller.setCurrentCar(car);
                     carView.render();
                 };
             })(car)
         );
         this.carListElem.appendChild(elem);
       }
   },
};
controller.init();