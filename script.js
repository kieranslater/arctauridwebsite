const contactLinks = document.querySelectorAll('[data-dog]');
const dogSelect = document.getElementById('dog');
const interestSelect = document.getElementById('interest');
const messageField = document.getElementById('message');
const form = document.getElementById('contact-form');

function setEnquiry(dog, interest = 'general') {
  if (dogSelect) dogSelect.value = dog || '';
  if (interestSelect) interestSelect.value = interest || 'general';

  const label = dog ? `${interest.charAt(0).toUpperCase() + interest.slice(1)} enquiry about ${dog}.` : '';
  if (messageField && !messageField.value.trim()) {
    messageField.value = label ? `${label}\n` : '';
  }
}

contactLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setEnquiry(link.dataset.dog, link.dataset.interest);
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const interest = interestSelect.value;
  const dog = dogSelect.value.trim();
  const message = messageField.value.trim();

  const subjectParts = ['Arctaurid Gundogs'];
  if (interest) subjectParts.push(interest.charAt(0).toUpperCase() + interest.slice(1));
  if (dog) subjectParts.push(dog);

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Enquiry type: ${interest}`,
    `Dog: ${dog || 'No preference'}`,
    '',
    message,
  ].join('\n');

  const targetEmail = 'dogs@kieranslater.co.uk';
  window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subjectParts.join(' · '))}&body=${encodeURIComponent(body)}`;
});
