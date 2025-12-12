// ============================================
// ARQUITECTURA DEL DINERO - JavaScript Principal
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('js');

    // Smooth scroll para los enlaces internos
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animación de entrada para las cards (sobria) con stagger
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${index * 80}ms`;
                entry.target.classList.add('is-visible');
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => observer.observe(card));

    // Animación de números contadores
    animateNumbers();
});

// Animación de números para estadísticas
function animateNumbers() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const rawValue = target.getAttribute('data-animate-value') || target.getAttribute('data-value');
                const finalValue = parseFloat(rawValue);
                if (!Number.isFinite(finalValue)) {
                    observer.unobserve(target);
                    return;
                }
                animateValue(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-animate-value]').forEach(el => {
        observer.observe(el);
    });
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = start + (end - start) * easeOutQuart(progress);
        
        element.textContent = Math.floor(value).toLocaleString('es-AR');
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    
    requestAnimationFrame(step);
}

function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

// ============================================
// UTILIDADES COMPARTIDAS PARA HERRAMIENTAS
// ============================================

// Formatear números como moneda
function formatCurrency(value, currency = 'ARS') {
    const symbols = {
        'ARS': '$',
        'USD': 'US$'
    };
    
    return `${symbols[currency]} ${value.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

// Formatear números grandes de forma legible
function formatNumber(value) {
    return value.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

// Calcular interés compuesto
function calculateCompoundInterest(principal, monthlyContribution, annualRate, years) {
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = years * 12;
    
    let balance = principal;
    const timeline = [{month: 0, balance: principal, contributions: 0, interest: 0}];
    
    for (let month = 1; month <= totalMonths; month++) {
        const interest = balance * monthlyRate;
        balance += interest + monthlyContribution;
        
        const totalContributions = principal + (monthlyContribution * month);
        const totalInterest = balance - totalContributions;
        
        timeline.push({
            month,
            balance,
            contributions: totalContributions,
            interest: totalInterest
        });
    }
    
    return {
        finalBalance: balance,
        totalContributions: principal + (monthlyContribution * totalMonths),
        totalInterest: balance - (principal + monthlyContribution * totalMonths),
        timeline
    };
}

// Validar inputs numéricos
function validateNumberInput(input, min = 0, max = Infinity) {
    const value = parseFloat(input.value);
    
    if (isNaN(value) || value < min || value > max) {
        input.style.borderColor = '#ef4444';
        return false;
    }
    
    input.style.borderColor = '';
    return true;
}

// Exportar funciones para uso en otras páginas
if (typeof window !== 'undefined') {
    window.FinanceUtils = {
        formatCurrency,
        formatNumber,
        calculateCompoundInterest,
        validateNumberInput
    };
}
