import {getResource} from '../services/services';

function cards () {
    //class
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.chagedUSD();
            
        }

        chagedUSD() {
            this.price = this.price * this.transfer;
        }

        verst() {
            const elem = document.createElement('div');
            if(this.classes.length === 0) {
                this.classes = "menu__item";
                elem.classList.add(this.classes);
            } else {
                this.classes.forEach(className => elem.classList.add(className));
            }
            elem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(elem);
        }
    }
    

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, alting, title, descr, price}) => {
                new MenuCard(img, alting, title, descr, price, ".menu .container").verst();
            });
        });
}

export default cards;