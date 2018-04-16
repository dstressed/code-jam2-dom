;
(function() {

    let source, length, tips, p, dots, current, index = 0;

    const createTipsElement = () => {
        const tips = document.createElement('div');
        tips.innerHTML = '<div class="tips-content"><div class="button-close"></div><h3>TIP OF THE DAY</h3><p></p></div><div class="tips-control"><div class="tips-checkbox"><span data-checked=false class="input"></span><span>Disable Tips</span></div><div class="tips-carousel"><span class="carousel-button button-left"></span><div class="carousel-dots"></div><span class="carousel-button button-right"></span></div></div>';
        tips.classList.add('tips');
        p = tips.querySelector('p');
        p.textContent = source[0];
        addDotElements(tips.querySelector('.carousel-dots'));
        return tips;
    };

    const addDotElements = element => {
        dots = element;
        for (let i = 0; i < source.length; i++) {
            let span = document.createElement('span');
            span.setAttribute('data-index', i);
            dots.appendChild(span);
        }
        current = dots.children[0];
        current.classList.add('-current');
    };

    const changeTip = i => {
        index = i;
        p.textContent = source[index];
        current.classList.remove('-current');
        current = dots.children[index];
        current.classList.add('-current');
    };

    const mouseHandler = event => {
        let target = event.target;
        let list = target.classList;
        switch (true) {
            case list.contains('button-close'):
                event.currentTarget.style.display = 'none';
                break;
            case list.contains('button-left'):
                changeTip((index === 0) ? length : index - 1);
                break;
            case list.contains('button-right'):
                changeTip((index === length) ? 0 : index + 1);
                break;
            case target.parentElement.classList.contains('carousel-dots'):
                changeTip(Number(target.dataset.index));
                break;
            case list.contains('input'): {
                list.toggle('-checked');
                target.dataset.checked = (target.dataset.checked === 'false') ? 'true' : 'false';
                localStorage.setItem('input-checkbox-checked', target.dataset.checked);
            }
        }
    };

    const keyboardHandler = event => {
        if (tips.style.display === 'none') return;
        let click = new Event('click', { bubbles: true, cancelable: true });
        switch (event.keyCode) {
            case 27:
                tips.querySelector('.button-close').dispatchEvent(click);
                break;
            case 37:
                tips.querySelector('.button-left').dispatchEvent(click);
                break;
            case 39:
                tips.querySelector('.button-right').dispatchEvent(click);
        }
    };

    window.addTipsElement = array => {
        if (localStorage.getItem('input-checkbox-checked') === 'true') return;
        source = array;
        length = source.length - 1;
        tips = createTipsElement();
        tips.addEventListener('click', mouseHandler);
        document.body.addEventListener('keydown', keyboardHandler);
        setTimeout(() => document.body.appendChild(tips), 5000);
    };
})();

addTipsElement([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
]);