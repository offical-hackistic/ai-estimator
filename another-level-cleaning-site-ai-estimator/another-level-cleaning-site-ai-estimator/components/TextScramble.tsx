"use client";
import { useEffect } from 'react';

export default function useTextScramble(selector: string = '.el-st') {
  useEffect(() => {
    const stringRandom = (function () {
      const data = {
        isScrolling: false,
        repeat: 0,
        target: [] as Element[],
        letters: "*+-/@_$[%£!XO1&>",
        originalStrings: "",
        singleLetters: [] as NodeListOf<Element> | Element[],
      };

      // Add shuffle method to Array prototype
      (Array.prototype as any).shuffle = function () {
        const input = this;
        for (let i = input.length - 1; i >= 0; i--) {
          const randomIndex = Math.floor(Math.random() * (i + 1));
          const itemAtIndex = input[randomIndex];
          input[randomIndex] = input[i];
          input[i] = itemAtIndex;
        }
        return input;
      };

      function checkLength(x: string) {
        return Array.from(document.querySelectorAll(x)).length > 0;
      }

      function addListener(evt: string, fx: EventListener) {
        window.addEventListener(evt, fx);
      }

      function changeLetter(letter: Element) {
        if (letter.textContent != " ") {
          letter.classList.add("is-changing");
          (letter as HTMLElement).style.animationDuration = Math.random().toFixed(2) + "s";
          const newChar = data.letters.substr(
            Math.floor(Math.random() * data.letters.length),
            1
          );
          letter.textContent = newChar;
          letter.setAttribute("data-txt", newChar);
        }
      }

      function resetLetter(letter: Element, value: string) {
        letter.classList.remove("is-changing");
        letter.textContent = value;
        letter.setAttribute("data-txt", value);
      }

      // Divide single letters of strings and wrap them in spans
      function divideLetters() {
        data.target.forEach((element, index) => {
          const text = element.textContent || "";
          let textDivided = "";
          data.originalStrings = text;
          for (let i = 0; i < text.length; i++) {
            textDivided += `<span class="el-sp el-st-${index}-span-${i}" data-txt="${text.substr(
              i,
              1
            )}">${text.substr(i, 1)}</span>`;
          }
          element.innerHTML = textDivided;
        });
        data.singleLetters = document.querySelectorAll(".el-sp");
      }

      // Changes letters
      function changeLetters() {
        if (data.isScrolling) {
          data.singleLetters.forEach(function (el) {
            changeLetter(el);
          });
        }
        setTimeout(changeLetters, 10);
      }

      // Reset to initial letters
      function resetLetters() {
        const randomArray = [];
        for (let i = 0; i < data.singleLetters.length; i++) {
          randomArray.push(i);
        }
        (randomArray as any).shuffle();
        randomArray.forEach(function (el, index) {
          setTimeout(function () {
            resetLetter(
              data.singleLetters[el],
              data.originalStrings.substring(el, el + 1)
            );
          }, index * 20 * Math.random() * 5);
        });
      }

      // Event listener on scroll
      function updateScrollState() {
        let delay: NodeJS.Timeout;
        clearTimeout(delay);
        data.isScrolling = true;
        delay = setTimeout(function () {
          data.isScrolling = false;
          resetLetters();
        }, 300);
      }

      return {
        init: function (selector: string) {
          // Check if there are strings to act on
          if (checkLength(selector)) {
            // Save the strings
            data.target = Array.from(document.querySelectorAll(selector));

            // Divide individual strings into letters
            divideLetters();

            // Launch the repeating function
            changeLetters();

            // Add listener to scroll
            addListener("scroll", updateScrollState);
          }
        },
      };
    })();

    stringRandom.init(selector);

    // Cleanup function
    return () => {
      // Remove scroll listener if needed
      window.removeEventListener('scroll', () => {});
    };
  }, [selector]);
}

// Example component that uses the text scramble effect
export function ScrambleText({ children, className = "el-st" }: { children: React.ReactNode; className?: string }) {
  useTextScramble(`.${className}`);
  
  return (
    <span className={className}>
      {children}
    </span>
  );
}
