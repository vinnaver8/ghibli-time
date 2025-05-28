 const card = document.getElementById('card-wrapper');
  let direction = 1;
  let position = 100; // start at 150px
  const minY = 100;
  const maxY = 1200;
  const speed = 0.8; // adjust for slower/faster

  function animate() {
    position += direction * speed;

    if (position >= maxY || position <= minY) {
      direction *= -1; // reverse direction
    }

    card.style.top = position + "px";
    requestAnimationFrame(animate);
  }

  // Start animation when DOM is ready
  window.addEventListener('DOMContentLoaded', animate);
// Messages for each card
    const cardMessages = [
      ["Generating your resume...", "Analyzing skills...", "Resume ready!"],
      ["Selecting templates...", "Building website...", "Website deployed!"],
      ["Processing images...", "Applying filters...", "Image complete!"],
      ["Calculating routes...", "Optimizing directions...", "Map ready!"],
      ["Compiling invoice...", "Finalizing totals...", "Invoice created!"]
    ];
    const cards = Array.from(document.querySelectorAll('.card'));
    let currentIndex = 0;
    let isAnimating = false;

    // Function to type out messages in a given card index
    function typeCard(index) {
      const messages = cardMessages[index];
      const p = cards[index].querySelector('.typing-text');
      let msgIndex = 0, charIndex = 0;
      p.textContent = '';
      function typeChar() {
        const currentMsg = messages[msgIndex];
        if (charIndex < currentMsg.length) {
          p.textContent += currentMsg.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, 50);
        } else {
          // Pause and then show next message
          setTimeout(() => {
            msgIndex++;
            if (msgIndex < messages.length) {
              p.textContent = '';
              charIndex = 0;
              typeChar();
            }
          }, 800);
        }
      }
      typeChar();
    }

    // Show the first card and start typing
    cards[0].classList.remove('hidden');
    typeCard(0);

    // Function to move to the next card on scroll/click
    function nextCard() {
      if (isAnimating) return;
      if (currentIndex >= cards.length - 1) return;
      isAnimating = true;

      // Fold down current card
      const currentCard = cards[currentIndex];
      currentCard.classList.add('rotate-x-90');
      // After animation, hide it and show next card
      setTimeout(() => {
        currentCard.classList.add('hidden');
        currentIndex++;
        const nextCardElem = cards[currentIndex];
        nextCardElem.classList.remove('hidden');
        // Start typing on the new card
        typeCard(currentIndex);
        isAnimating = false;
      }, 700);
    }

    // Listen for scroll or click to trigger card transition
    window.addEventListener('wheel', nextCard);
    window.addEventListener('click', nextCard);

     //3rd box
const mainCard = document.querySelector('.main-card');
    const rightBoxes = document.querySelectorAll('.right-box');
    let animating = false;

    mainCard.addEventListener('click', () => {
      if (animating) return;
      animating = true;
      mainCard.classList.add('ring-4', 'ring-blue-400', 'ring-opacity-50');

      // Slide right-side boxes fully out to the LEFT
      rightBoxes.forEach(box => {
        box.style.transition = 'transform 0.8s ease';
        box.style.transform = 'translateX(-350%)';
      });

      // After sliding out, wait 1s then bring back in from right
      setTimeout(() => {
        // Prepare boxes off-screen at right
        rightBoxes.forEach(box => {
          box.style.transition = 'none';
          box.style.transform = 'translateX(600%)';
        });
        // Force reflow
        void rightBoxes[0].offsetWidth;
        // Slide back to original position
        rightBoxes.forEach(box => {
          box.style.transition = 'transform 0.7s ease';
          box.style.transform = 'translateX(0)';
        });
        // Cleanup after animation
        setTimeout(() => {
          mainCard.classList.remove('ring-4', 'ring-blue-400', 'ring-opacity-50');
          animating = false;
        }, 700);
      }, 1500); // 0.5s slide-out + 1s wait
    });

// Keyboard js
    function highlightKey(key) {
      const keyElem = document.querySelector('#keyboard .key[data-key="' + key + '"]');
      if (!keyElem) return;
      keyElem.classList.add('highlight');
      setTimeout(() => {
        keyElem.classList.remove('highlight');
      }, 300);
    }
    // Click handlers for actions
    document.querySelectorAll('.action-item').forEach(item => {
      item.addEventListener('click', () => {
        const key = item.getAttribute('data-key');
        highlightKey(key);
      });
    });
    // Keyboard key press handlers
    window.addEventListener('keydown', (e) => {
      const key = e.key.toUpperCase();
      if (['V','B','M'].includes(key)) {
        highlightKey(key);
      }
    });
    // Close button hides command box
    document.getElementById('closeBtn').addEventListener('click', () => {
      document.getElementById('commandBox').style.display = 'none';
    });

//animation for indox ai preview//
    const messages = document.getElementById('messages');
    const animBox = document.getElementById('animBox');
    const animIcon = document.getElementById('animIcon');
    const animText = document.getElementById('animText');
    const processDetails = document.getElementById('processDetails'); // New element for process details
    const deepPanel = document.getElementById('deepPanel');
    const deepSearchStepsContainer = document.getElementById('deepSearchSteps');
    const sourceList = document.getElementById('sourceList');

    // SVG icons for different actions
    const icons = {
      img: 'M21 19V5c0-1.1-.9-2-2-2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM5 19V5h14v14H5zm3-7l2.5 3.01L14.5 11l4.5 6H5l3-4z', // Image icon
      think: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.34 0 .67-.03 1-.08v-2.02c-.32.05-.66.1-1 .1-4.42 0-8-3.58-8-8 0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.44-.39 2.78-1.07 3.93l1.46 1.46C21.17 15.14 22 13.63 22 12c0-5.52-4.48-10-10-10z', // Thinking icon
      web: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z', // Web search icon
      deep: 'M12 4l1.41 1.41L7.83 11H20v2H7.83l5.58 5.59L12 20l-8-8 8-8z', // Deep search icon (used in header for animation)
      check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z' // Checkmark icon
    };

    // Conversation flow for the animation
    const convo = [
      { from: 'user', text: "What is Indox AI?" },
      { from: 'ai', text: 'Indox AI is a cutting-edge artificial intelligence assistant designed to provide comprehensive information, generate creative content, and perform deep web searches to assist users with a wide range of tasks. Its advanced capabilities include natural language understanding, image synthesis, and intelligent data analysis.' },
      { from: 'user', text: 'Generate a sample image.' },
      { action: 'img', text: 'Generating image...', process: [
        'Initializing image generation model...',
        'Analyzing prompt for visual elements...',
        'Synthesizing base image structure...',
        'Adding intricate details and textures...',
        'Applying color grading and lighting...',
        'Optimizing pixels for clarity and resolution...',
        'Finalizing image output.'
      ], processDelay: 700, postProcessDelay: 2000 }, // Increased delay for image generation process
      { from: 'ai', text: 'Image ready!', image: 'https://placehold.co/100x100/5e8aff/ffffff?text=Sample+Image' }, // Placeholder image
      { from: 'user', text: 'How to create a website in GitHub?' },
      { action: 'think', text: 'Thinking about GitHub website creation...', process: [
        '<h3>Thought Process:</h3>',
        '<p>Analyzing the request: "How to create a website in GitHub?" This implies understanding GitHub Pages, static site generators, and basic web development (HTML, CSS, JS).</p>',
        '<p>Initial knowledge retrieval: Recall steps for GitHub repository creation, enabling GitHub Pages, and common file structures (index.html).</p>',
        '<p>Identifying potential complexities: Custom domains, Jekyll/Hugo integration, CI/CD for updates.</p>',
        '<p>Formulating a structured answer: Break down the process into manageable steps for the user.</p>'
      ], processDelay: 800, postProcessDelay: 1500 },
      { action: 'analysisComplete', text: 'Analysis completed.' }, // New action for analysis completion
      { from: 'ai', text: 'Creating a website on GitHub typically involves using GitHub Pages, a feature that allows you to host static websites directly from your GitHub repository. You\'ll need to create a repository, push your HTML, CSS, and JavaScript files, and then enable GitHub Pages in your repository settings. For more complex sites, you might use static site generators like Jekyll or Hugo.' },
      { from: 'user', text: 'Deep dive into website creation planning and styling.' },
      // DeepSearch specific steps
      { action: 'deepSearchStart', text: 'Initiating DeepSearch for website planning...' },
      { action: 'deepSearchStep1', text: 'Understanding website requirements and user flow.' },
      { action: 'deepSearchStep2', text: 'Researching best practices for responsive CSS design and modern JavaScript frameworks.', typing: true },
      { action: 'deepSearchStep3', text: 'Compiling resources for HTML structure, CSS styling, and interactive JS elements.' },
      { action: 'deepSearchComplete', text: 'Deep Search Completed!' }, // This action triggers the final checkmark in the deep panel
      { from: 'ai', text: '✅ Deep Search Completed!' }, // Final message in the chat panel
      { from: 'ai', text: 'For website creation, planning involves defining your target audience, content strategy, and user experience (UX) flow. For styling, modern best practices include mobile-first design, responsive layouts using Flexbox or Grid, and leveraging CSS frameworks like Tailwind CSS. JavaScript is crucial for interactivity, dynamic content, and features like form validation or API integrations.' },
      { from: 'user', text: 'Thanks, that was helpful!' }
    ];

    let idx = 0; // Current step index in the conversation
    let typingMessageElement = null; // To hold the typing indicator message element

    /**
     * Simulates typing text into an element.
     * @param {HTMLElement} element The element to type into.
     * @param {string} text The text to type.
     * @param {number} speed Typing speed in milliseconds per character.
     * @param {function} callback Function to call after typing is complete.
     */
    function typeEffect(element, text, speed, callback) {
      let i = 0;
      element.textContent = ''; // Clear existing text
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typingInterval);
          if (callback) callback();
        }
      }, speed);
    }

    /**
     * Appends a new message to the chat interface.
     * @param {string} cls Class name for the message (e.g., 'user', 'ai').
     * @param {string} text The text content of the message.
     * @param {string} [imageSrc] Optional URL for an image to display.
     */
    function appendMsg(cls, text, imageSrc = null) {
      const d = document.createElement('div');
      d.className = 'message ' + cls;

      if (cls === 'ai' && typingMessageElement) {
        // If there's an active typing message, replace its content
        d.style.opacity = 1; // Ensure it's visible immediately
        d.style.transform = 'translateY(0)';
        typingMessageElement.replaceWith(d);
        typingMessageElement = null; // Clear the reference
      } else {
        messages.appendChild(d);
      }

      d.textContent = text; // Set text content

      if (imageSrc) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-preview';
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Generated Image Preview';
        imgContainer.appendChild(img);
        d.appendChild(imgContainer);
      }

      // Scroll to the bottom to show the latest message
      messages.scrollTop = messages.scrollHeight;
    }

    /**
     * Displays a typing indicator message in the chat.
     */
    function showTypingIndicator() {
      const d = document.createElement('div');
      d.className = 'message ai typing-message';
      d.innerHTML = 'Indox AI is typing <span class="typing-indicator"><span></span><span></span><span></span></span>';
      messages.appendChild(d);
      messages.scrollTop = messages.scrollHeight;
      typingMessageElement = d; // Store reference to the typing message
    }

    /**
     * Clears all dynamic content from the right panel.
     */
    function clearRightPanelContent() {
      processDetails.style.display = 'none';
      processDetails.innerHTML = '';
      deepPanel.style.display = 'none';
      deepSearchStepsContainer.innerHTML = '';
      sourceList.style.display = 'none';
      animBox.classList.remove('shimmer');
    }

    /**
     * Populates and displays the process details in the right panel.
     * @param {Array<string>} steps An array of strings, each representing a step or paragraph.
     * @param {number} delayBetweenSteps Delay in ms between displaying each step.
     * @param {function} callback Function to call after all steps are displayed.
     */
    function displayProcessSteps(steps, delayBetweenSteps, callback) {
      processDetails.style.display = 'flex'; // Show the process details panel
      processDetails.innerHTML = ''; // Clear previous content

      let stepIndex = 0;

      function showNextStep() {
        if (stepIndex < steps.length) {
          const stepContent = steps[stepIndex];
          const stepDiv = document.createElement('div');
          // Check if it's an HTML string (e.g., for <h3> or <p>)
          if (stepContent.startsWith('<')) {
            stepDiv.innerHTML = stepContent;
          } else {
            // For simple text steps, add a checkmark icon
            stepDiv.className = 'process-step';
            stepDiv.innerHTML = `<svg viewBox="0 0 24 24"><path d="${icons.check}"/></svg><span>${stepContent}</span>`;
          }
          processDetails.appendChild(stepDiv);
          processDetails.scrollTop = processDetails.scrollHeight; // Scroll to new step
          stepIndex++;
          setTimeout(showNextStep, delayBetweenSteps);
        } else {
          if (callback) callback();
        }
      }
      showNextStep();
    }


    /**
     * Proceeds to the next step in the animation sequence.
     */
    function nextStep() {
      // Check if all steps in the conversation are completed
      if (idx >= convo.length) {
        // If so, wait for a bit, then clear everything and restart the sequence
        setTimeout(() => {
          messages.innerHTML = ''; // Clear chat messages
          idx = 0; // Reset conversation index
          animText.textContent = 'Welcome!'; // Reset animation box text
          clearRightPanelContent(); // Clear all dynamic content from right panel
          setTimeout(nextStep, 1000); // Restart animation after a delay
        }, 3000); // Delay before restarting the entire sequence
        return;
      }

      const m = convo[idx++]; // Get the current step and increment index
      let delay = 1000; // Default delay between steps

      if (m.from) {
        // If it's a chat message (from user or AI)
        clearRightPanelContent(); // Clear dynamic content when chat message appears

        if (m.from === 'ai') {
          // If AI is about to respond, show typing indicator first
          showTypingIndicator();
          delay = 1500; // Delay before actual AI message appears
          setTimeout(() => appendMsg(m.from, m.text, m.image), delay);
          // Crucial: Return here as appendMsg is delayed, and nextStep will be called after
          // the current message is fully displayed (or replaced typing indicator).
          setTimeout(nextStep, delay + 500); // Call next step after the AI message is fully displayed
          return;
        } else {
          appendMsg(m.from, m.text, m.image);
        }
      } else if (m.action) {
        // If it's an action for the animation box
        clearRightPanelContent(); // Clear previous dynamic content

        animIcon.innerHTML = '<path d="' + icons[m.action] + '"/>'; // Set icon
        animText.textContent = m.text; // Set animation box text

        if (m.action === 'img' || m.action === 'think' || m.action === 'web') {
          if (m.action === 'img') animBox.classList.add('shimmer'); // Apply shimmer for image
          displayProcessSteps(m.process, m.processDelay, () => {
            // After process steps, keep shimmer if image, then wait for postProcessDelay
            setTimeout(() => {
                setTimeout(nextStep, 500); // Proceed to next convo step after post-process delay
            }, m.postProcessDelay);
          });
          return; // Don't call nextStep immediately, it's called by the callback
        } else if (m.action === 'analysisComplete') {
            animText.textContent = m.text; // Update animBox text with analysis complete
            delay = 1000; // Short delay for this final message
        } else if (m.action === 'deepSearchStart') {
          deepPanel.style.display = 'flex'; // Show DeepSearch panel
          deepSearchStepsContainer.innerHTML = ''; // Clear any previous steps
          const step1 = document.createElement('div');
          step1.textContent = 'Understanding the request';
          deepSearchStepsContainer.appendChild(step1);
          delay = 1500;
        } else if (m.action === 'deepSearchStep1') {
          // This step is handled by 'deepSearchStart' adding the first line.
          delay = 1500;
        } else if (m.action === 'deepSearchStep2') {
          // Simulate typing for the search query
          const step2 = document.createElement('div');
          const textSpan = document.createElement('span');
          step2.appendChild(textSpan);
          deepSearchStepsContainer.appendChild(step2);

          const typingText = m.text;
          const typingSpeed = 70; // Speed of typing characters
          typeEffect(textSpan, typingText, typingSpeed, () => {
            // Add typing dots after the text is fully typed
            const dots = document.createElement('span');
            dots.className = 'typing-indicator ml-2'; // Add margin-left for spacing
            dots.innerHTML = '<span></span><span></span><span></span>';
            step2.appendChild(dots);
            setTimeout(() => {
              dots.remove(); // Remove dots after a short display
              setTimeout(nextStep, 500); // Proceed to the next step
            }, 1500); // Duration for which dots are visible
          });
          return; // Crucial: Do not call nextStep immediately, it's called by the typeEffect callback
        } else if (m.action === 'deepSearchStep3') {
          // Display search results (source list)
          const step3 = document.createElement('div');
          step3.textContent = 'Displaying search results...';
          deepSearchStepsContainer.appendChild(step3);
          sourceList.style.display = 'flex'; // Show the source list
          delay = 2000;
        } else if (m.action === 'deepSearchComplete') {
          // Final DeepSearch message in the panel
          const step4 = document.createElement('div');
          step4.className = 'text-green-400 font-semibold'; // Highlight success message
          step4.innerHTML = `<svg viewBox="0 0 24 24" style="width:20px; height:20px; fill:currentColor; margin-right:5px;"><path d="${icons.check}"/></svg>${m.text}`;
          deepSearchStepsContainer.appendChild(step4);
          animText.textContent = m.text; // Update animBox text as well
          delay = 1000;
        }
      }
      // Schedule the next step based on the calculated delay
      setTimeout(nextStep, delay);
    }

    // Start the animation sequence after a short initial delay
    setTimeout(nextStep, 1000);

              // pin draggable//
  const pin = document.getElementById('pin-container');
let isDragging = false;
let offset = { x: 0, y: 0 };

// Save the original position from CSS (we’ll revert to this)
const originalLeft = pin.style.left;
const originalTop = pin.style.top;

// Start dragging
function startDrag(x, y) {
  isDragging = true;
  const rect = pin.getBoundingClientRect();
  offset.x = x - rect.left;
  offset.y = y - rect.top;

  // Remove transition to make real-time movement immediate
  pin.style.transition = 'none';
  document.body.style.userSelect = 'none';
  pin.style.zIndex = 9999; // Ensure it stays on top while dragging
}

// While dragging
function onDrag(x, y) {
  if (!isDragging) return;
  const newLeft = x - offset.x;
  const newTop = y - offset.y;
  pin.style.left = `${newLeft}px`;
  pin.style.top = `${newTop}px`;
}

// When dragging ends
function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  document.body.style.userSelect = 'auto';

  // Enable smooth transition
  pin.style.transition = 'all 0.5s ease';

  // Reset back to original CSS position (removes inline overrides)
  pin.style.removeProperty('left');
  pin.style.removeProperty('top');
  pin.style.zIndex = '';
}

// Mouse Events
pin.addEventListener('mousedown', e => {
  e.preventDefault();
  startDrag(e.clientX, e.clientY);
});
document.addEventListener('mousemove', e => onDrag(e.clientX, e.clientY));
document.addEventListener('mouseup', endDrag);

// Touch Events (for mobile)
pin.addEventListener('touchstart', e => {
  const t = e.touches[0];
  startDrag(t.clientX, t.clientY);
});
pin.addEventListener('touchmove', e => {
  const t = e.touches[0];
  onDrag(t.clientX, t.clientY);
});
pin.addEventListener('touchend', endDrag);
