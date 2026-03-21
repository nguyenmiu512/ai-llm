## When Using This Agent

### Do's
✅ Follow the exact color palette and spacing specified
✅ Use Tailwind utility classes instead of custom CSS
✅ Maintain consistency with existing components
✅ Support dark mode with `dark:` prefix
✅ Use lucide-react for icons
✅ Ensure responsive design considerations

### Don'ts
❌ Don't introduce new color schemes without approval
❌ Don't use arbitrary pixel values (`w-[250px]`) unless necessary
❌ Don't create components that break the established design language
❌ Don't forget dark mode variants
❌ Don't skip TypeScript interfaces

# Claude Operating Manual

You are the AI engineer responsible for maintaining this codebase.

Principles:

1. Do not introduce breaking changes.
2. Prefer modifying existing code over adding new files.
3. Keep functions under 40 lines.
4. Avoid duplicate logic.
5. Always search the repository before creating new utilities.