document.addEventListener('DOMContentLoaded', function() {
    const editor = new MediumEditor('#editable-text', {
      placeholder: {
        text: 'Enter your text here'
      }
    });
  
    document.getElementById('password').addEventListener('input', function () {
      const password = this.value.trim();
      const resultText = document.getElementById('result-text');
      const editSection = document.querySelector('.edit-section');
    
      if (password === '97454') {
        resultText.innerText = 'Correct password! You unlocked the secret message.';
        resultText.style.color = 'green';
        resultText.style.display = 'block';
        editSection.style.display = 'block';
      } else {
        resultText.style.display = 'none';
        editSection.style.display = 'none';
        clearEditableText();
      }
    });
    
    document.getElementById('edit-button').addEventListener('click', function () {
      const editedText = editor.getContent(); // Use getContent to get HTML content including images
      updateText(editedText);
      clearEditableText();
    });
  
    document.getElementById('editable-text').addEventListener('paste', function (event) {
      // Handle the paste event
      handlePaste(event);
    });
  
    function handlePaste(event) {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedText = clipboardData.getData('text/plain');
      const pastedHtml = clipboardData.getData('text/html');
  
      // Do something with the pastedText or pastedHtml
      console.log('Pasted Text:', pastedText);
      console.log('Pasted HTML:', pastedHtml);
  
      // You can insert the pasted content into the editor
      editor.pasteHTML(pastedHtml);
  
      // Prevent the default paste behavior
      event.preventDefault();
    }
  
    function updateText(newText) {
      const textBody = document.getElementById('text-body');
      const newDiv = document.createElement('div');
      newDiv.innerHTML = `<h3>${newText}</h3><button class="remove-button" onclick="removeText(this)">Remove</button>`;
      textBody.appendChild(newDiv);
      hideEditSection();
      // Save edited text to localStorage
      saveTextToStorage(textBody.innerHTML);
    }
    
    function clearEditableText() {
      editor.setContent(''); // Use setContent to clear the content
    }
    
    function hideEditSection() {
      const editSection = document.querySelector('.edit-section');
      editSection.style.display = 'none';
    }
  
    // Load text from storage when the page loads
    loadTextFromStorage();
  });
  
  // Function to remove a specific text block
  function removeText(button) {
    const textBlock = button.previousElementSibling; // Get the <h3> element
    const textBody = document.getElementById('text-body');
    textBody.removeChild(textBlock.parentElement); // Remove the entire <div> containing text and button
    saveTextToStorage(textBody.innerHTML);
  }
  
  