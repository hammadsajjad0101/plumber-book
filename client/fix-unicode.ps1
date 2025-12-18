# Read the file
$filePath = 'app\blog\blogData.js'
$content = Get-Content $filePath -Raw -Encoding UTF8

Write-Host "Original file size: $($content.Length) characters"

# Replace all Unicode special characters with ASCII equivalents
$content = $content -replace '\u2014', '--'        # em dash
$content = $content -replace '\u2013', '-'         # en dash
$content = $content -replace '\u2019', "'"         # right single quote
$content = $content -replace '\u2018', "'"         # left single quote
$content = $content -replace '\u201C', '"'         # left double quote
$content = $content -replace '\u201D', '"'         # right double quote
$content = $content -replace '\u2026', '...'       # ellipsis
$content = $content -replace '\u00A0', ' '         # non-breaking space

Write-Host "Modified file size: $($content.Length) characters"

# Save the file
Set-Content $filePath -Value $content -Encoding UTF8 -NoNewline

Write-Host "File saved successfully!"
