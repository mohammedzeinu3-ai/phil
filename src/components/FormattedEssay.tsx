import React from 'react';
import { Quote, Sparkles } from 'lucide-react';

interface FormattedEssayProps {
  content: string;
  onQuoteSelect?: (quote: string) => void;
  fontFamily?: 'serif' | 'sans';
  fontSize?: 'sm' | 'md' | 'lg';
}

export const FormattedEssay: React.FC<FormattedEssayProps> = ({
  content,
  onQuoteSelect,
  fontFamily = 'serif',
  fontSize = 'md'
}) => {
  const fontClass = fontFamily === 'serif' ? 'font-serif-body' : 'font-sans-ui';
  const sizeClasses = {
    sm: 'text-[17px] leading-[1.75]',
    md: 'text-[19px] leading-[1.85]',
    lg: 'text-[21px] leading-[1.9]'
  }[fontSize];

  // Parse lines into logical blocks
  const blocks = React.useMemo(() => {
    const rawBlocks = content.split(/\n\n+/);
    return rawBlocks;
  }, [content]);

  return (
    <article className={`${fontClass} ${sizeClasses} text-[#2c2825] max-w-[70ch] mx-auto space-y-7 selection:bg-[#fde68a]`}>
      {blocks.map((block, idx) => {
        const trimmed = block.trim();

        // Horizontal Rule
        if (trimmed === '---' || trimmed === '***') {
          return (
            <div key={idx} className="my-10 flex items-center justify-center space-x-3 text-[#a89988]">
              <span className="w-12 h-[1px] bg-[#d6cbbe]"></span>
              <span className="text-xs tracking-widest uppercase font-display-title">✦ ✦ ✦</span>
              <span className="w-12 h-[1px] bg-[#d6cbbe]"></span>
            </div>
          );
        }

        // Heading 3 / Section title
        if (trimmed.startsWith('### ')) {
          const headingText = trimmed.replace(/^###\s+/, '');
          return (
            <h3
              key={idx}
              className="pt-6 pb-2 font-display-title text-2xl md:text-[28px] font-bold tracking-tight text-[#1c1917] border-b border-[#e7dfd5]"
            >
              {headingText}
            </h3>
          );
        }

        // Heading 2
        if (trimmed.startsWith('## ')) {
          const headingText = trimmed.replace(/^##\s+/, '');
          return (
            <h2
              key={idx}
              className="pt-8 pb-3 font-display-title text-3xl font-extrabold tracking-tight text-[#1c1917]"
            >
              {headingText}
            </h2>
          );
        }

        // Blockquote
        if (trimmed.startsWith('>')) {
          const quoteLines = trimmed
            .split('\n')
            .map(line => line.replace(/^>\s?/, ''))
            .filter(Boolean);

          const quoteText = quoteLines[0] || '';
          const attribution = quoteLines[1] || '';

          return (
            <figure
              key={idx}
              className="my-8 pl-6 pr-4 py-5 border-l-3 border-[#78350f] bg-[#f5ede3]/60 rounded-r-lg relative group transition-colors hover:bg-[#f5ede3]"
            >
              <Quote className="w-7 h-7 text-[#b5a491]/50 absolute -top-3 -left-3.5 bg-[#faf8f5] rounded-full p-1 border border-[#e7dfd5]" />
              <blockquote className="italic font-serif text-[#3e342b] text-xl leading-relaxed">
                {quoteText}
              </blockquote>
              {attribution && (
                <figcaption className="mt-3 text-sm font-sans font-medium text-[#78350f] tracking-wide flex items-center justify-between">
                  <span>{attribution}</span>
                  {onQuoteSelect && (
                    <button
                      type="button"
                      onClick={() => onQuoteSelect(quoteText.replace(/^["“]|["”]$/g, ''))}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-[#e8dece] hover:bg-[#d8ccbb] text-[#5c4a38] px-2.5 py-1 rounded cursor-pointer flex items-center space-x-1"
                      title="Quote this passage in the comment section"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Quote in debate</span>
                    </button>
                  )}
                </figcaption>
              )}
            </figure>
          );
        }

        // Numbered list or bullet points
        if (trimmed.startsWith('1. ') || trimmed.startsWith('- ')) {
          const items = trimmed.split('\n');
          return (
            <ul key={idx} className="space-y-3 pl-5 my-5">
              {items.map((item, itemIdx) => {
                const cleanItem = item.replace(/^(\d+\.|\-)\s+/, '');
                // Simple bold parsing
                const formattedHtml = cleanItem.replace(
                  /\*\*([^*]+)\*\*/g,
                  '<strong class="font-semibold text-[#1c1917]">$1</strong>'
                ).replace(
                  /\*([^*]+)\*/g,
                  '<em class="italic text-[#3e342b]">$1</em>'
                );

                return (
                  <li key={itemIdx} className="list-disc pl-2 marker:text-[#78350f]">
                    <span dangerouslySetInnerHTML={{ __html: formattedHtml }} />
                  </li>
                );
              })}
            </ul>
          );
        }

        // Regular paragraph
        const formattedHtml = trimmed
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-[#1c1917]">$1</strong>')
          .replace(/\*([^*]+)\*/g, '<em class="italic text-[#3e342b]">$1</em>');

        // First paragraph drop-cap effect if requested
        const isFirstPara = idx === 0 || (idx === 1 && blocks[0].startsWith('###'));

        return (
          <p
            key={idx}
            className={`${isFirstPara ? 'drop-cap' : ''}`}
            dangerouslySetInnerHTML={{ __html: formattedHtml }}
          />
        );
      })}
    </article>
  );
};
