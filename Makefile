
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

example: build
	@mkfile 150m download

clean:
	rm -fr build components template.js download

.PHONY: clean
