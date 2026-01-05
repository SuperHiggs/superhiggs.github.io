# Building a Modern Portfolio Site

**December 28, 2025**

In this post, I'll walk through the architecture and design decisions behind this portfolio site. It's a great example of how **simplicity and performance** can coexist with **beautiful design**.

## The Philosophy

When building this site, I had three core principles in mind:

1. **Performance First** - No unnecessary dependencies
2. **Accessibility** - Keyboard navigation and semantic HTML
3. **Aesthetic Appeal** - A unique steel-inspired design

## Technology Choices

### Vanilla JavaScript

Instead of reaching for a framework, I opted for vanilla JavaScript. Why?

```javascript
// Clean, readable, and fast
function changeContent(option) {
    const mainContent = document.getElementById('main-content');
    mainContent.style.transition = 'opacity 0.3s ease';
    mainContent.style.opacity = '0';
    
    setTimeout(() => {
        // Update content
        mainContent.innerHTML = content;
        mainContent.style.opacity = '1';
    }, 300);
}
```

**Benefits:**
- Zero build step required
- Lightning-fast load times
- No framework lock-in
- Easy to maintain and understand

### CSS Custom Properties

The entire design system is built on CSS variables:

```css
:root {
    --primary-color: #c0c0c0;
    --secondary-color: #e8e8e8;
    --accent-color: #a8a8a8;
    --steel-shine: #d4d4d4;
    --bg-dark: #0d0d0d;
}
```

This approach provides:
- **Consistency** - One source of truth for colors
- **Maintainability** - Update values in one place
- **Flexibility** - Easy to create themes
- **Performance** - Native browser support

## The Steel Aesthetic

The design draws inspiration from *industrial steel* and *retro-futurism*. Key elements include:

- **Metallic color palette** - Shades of silver and gray
- **Subtle gradients** - Creating depth and dimension
- **Sharp transitions** - Crisp, clean animations
- **Monospace typography** - Using Fira Code for that technical feel

### Creating the Metallic Sheen

One of my favorite touches is the metallic pattern overlay:

```css
body::before {
    content: '';
    position: fixed;
    background: 
        linear-gradient(45deg, transparent 48%, rgba(192, 192, 192, 0.02) 50%, transparent 52%),
        linear-gradient(-45deg, transparent 48%, rgba(192, 192, 192, 0.02) 50%, transparent 52%);
    background-size: 50px 50px;
}
```

This creates a *subtle crosshatch pattern* that mimics brushed steel.

## Responsive Design

The site adapts seamlessly to mobile devices:

- **Flexbox layout** - For fluid content arrangement
- **Media queries** - Optimized for screens under 768px
- **Touch-friendly** - Appropriate tap targets for mobile

## Accessibility Features

Accessibility was *not an afterthought*:

1. **Semantic HTML** - Proper use of `<nav>`, `<main>`, `<article>`
2. **ARIA labels** - For screen readers
3. **Keyboard navigation** - Full site usability without a mouse
4. **Focus indicators** - Clear visual feedback

Example of keyboard handling:

```javascript
function handleMenuKeyDown(event, option) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        changeContent(option);
    }
}
```

## Performance Metrics

The results speak for themselves:

- **First Contentful Paint:** < 0.5s
- **Time to Interactive:** < 1s
- **Total Bundle Size:** < 20KB (excluding fonts)
- **Lighthouse Score:** 95+

## Lessons Learned

Building this portfolio taught me valuable lessons:

- *You don't always need a framework* - Sometimes vanilla is better
- *Design systems are powerful* - CSS variables make theming effortless
- *Performance matters* - Users appreciate fast, responsive sites
- *Simplicity scales* - Less code means fewer bugs

## Future Enhancements

While the site is complete, I have ideas for future improvements:

- [ ] Dark/light theme toggle
- [ ] Blog search functionality
- [ ] Code syntax highlighting
- [ ] RSS feed for blog posts
- [ ] Progressive Web App features

## Conclusion

This portfolio site demonstrates that you can build something **beautiful**, **performant**, and **maintainable** without complex tooling. Sometimes the best solution is the simplest one.

The complete source code is available on [GitHub](https://github.com/SuperHiggs/superhiggs.github.io). Feel free to fork it, learn from it, or use it as inspiration for your own projects!

---

*What do you think? Let me know your thoughts on the design and architecture choices!*
