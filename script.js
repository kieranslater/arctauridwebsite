const contactLinks = document.querySelectorAll('[data-dog]');
const dogSelect = document.getElementById('dog');
const interestSelect = document.getElementById('interest');
const messageField = document.getElementById('message');
const form = document.getElementById('contact-form');

const dogsByInterest = {
  general: [
    { value: '', label: 'No preference' },
    { value: 'Merlin', label: 'Merlin' },
    { value: 'Fern', label: 'Fern' },
    { value: 'Finch', label: 'Finch' },
    { value: 'Newt', label: 'Newt' },
    { value: 'Reed', label: 'Reed' },
  ],
  stud: [{ value: 'Merlin', label: 'Merlin' }],
  litter: [
    { value: '', label: 'Any bitch' },
    { value: 'Fern', label: 'Fern' },
    { value: 'Finch', label: 'Finch' },
    { value: 'Newt', label: 'Newt' },
    { value: 'Reed', label: 'Reed' },
  ],
};

function populateDogOptions(interest = 'general', preferredDog = '') {
  if (!dogSelect) return;

  const options = dogsByInterest[interest] || dogsByInterest.general;
  dogSelect.innerHTML = '';

  options.forEach((option) => {
    const el = document.createElement('option');
    el.value = option.value;
    el.textContent = option.label;
    dogSelect.appendChild(el);
  });

  const allowedValues = options.map((option) => option.value);
  dogSelect.value = allowedValues.includes(preferredDog) ? preferredDog : options[0].value;
}

function formatInterest(interest) {
  return interest.charAt(0).toUpperCase() + interest.slice(1);
}

function setEnquiry(dog, interest = 'general') {
  if (interestSelect) interestSelect.value = interest || 'general';
  populateDogOptions(interest, dog || '');

  const label = dog
    ? `${formatInterest(interest)} enquiry about ${dog}.`
    : `${formatInterest(interest)} enquiry.`;

  if (messageField && !messageField.value.trim()) {
    messageField.value = `${label}\n`;
  }
}

populateDogOptions(interestSelect?.value || 'general');

contactLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setEnquiry(link.dataset.dog, link.dataset.interest);
  });
});

interestSelect?.addEventListener('change', () => {
  const currentDog = dogSelect?.value || '';
  populateDogOptions(interestSelect.value, currentDog);
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const interest = interestSelect.value;
  const dog = dogSelect.value.trim();
  const message = messageField.value.trim();

  const subjectParts = ['Arctaurid Gundogs'];
  if (interest) subjectParts.push(formatInterest(interest));
  if (dog) subjectParts.push(dog);

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Enquiry type: ${interest}`,
    `Dog: ${dog || 'No preference'}`,
    '',
    message,
  ].join('\n');

  const targetEmail = 'your@email.com';
  window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(
    subjectParts.join(' · ')
  )}&body=${encodeURIComponent(body)}`;
});
